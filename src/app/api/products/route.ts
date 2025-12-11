import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Product from "@/lib/modals/productModal";
import { productSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import { connectToDB } from "@/lib/db/mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import slugify from "slugify";

// === POST /api/products - Create a new product ===

export async function POST(req: NextRequest) {
  try {
    // -- Check authentication --
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // -- Parse request body --
    const body = await req.json();

    // -- Validate data with Zod --
    const validatedData = productSchema.parse(body);

    // -- Connect to database --
    await connectToDB();

    // -- Get userId from session --
    const userId = session.user.id as string;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID not found in session" },
        { status: 400 }
      );
    }

    // -- Generate slug from product name --
    const slug = slugify(validatedData.name, { lower: true, strict: true });

    // -- Create product with userId and slug --
    const product = await Product.create({
      ...validatedData,
      userId,
      slug,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);

    // -- Handle Zod validation errors --
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    // -- Handle duplicate key errors (e.g., slug already exists) --
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A product with this name already exists",
        },
        { status: 409 }
      );
    }

    // -- Handle other errors --
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// === GET /api/products - Get products with filters, search, sorting, and pagination ===

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    // -- Get session to check user role and ownership --
    const session = await getServerSession(authOptions);

    const { searchParams } = new URL(req.url);

    // -- Pagination parameters --
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(
      1,
      Math.min(100, parseInt(searchParams.get("limit") || "10"))
    );
    const skip = (page - 1) * limit;

    // -- Search query --
    const searchQuery = searchParams.get("q")?.trim();

    // -- Filter parameters --
    const category = searchParams.get("category")?.trim();
    const subCategory = searchParams.get("subcategory")?.trim();
    const brand = searchParams.get("brand")?.trim();
    const priceMin = searchParams.get("price_min");
    const priceMax = searchParams.get("price_max");
    const rating = searchParams.get("rating");
    const isPublished = searchParams.get("isPublished");
    const isFeatured = searchParams.get("isFeatured");
    const isBestSeller = searchParams.get("isBestSeller");
    const isDeal = searchParams.get("isDeal");
    const freeShipping = searchParams.get("freeShipping");

    // -- Sort parameter --
    const sort = searchParams.get("sort") || "latest";

    // -- Build filter object --
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    // -- Search across multiple fields (case-insensitive) --
    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { brand: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
        { subCategory: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { keywords: { $in: [new RegExp(searchQuery, "i")] } },
        {
          features: {
            $elemMatch: { value: { $regex: searchQuery, $options: "i" } },
          },
        },
      ];
    }

    // -- Category filter (supports multiple comma-separated values) --
    if (category) {
      const categories = category.split(",").map((c) => c.trim());
      if (categories.length === 1) {
        filter.category = { $regex: `^${categories[0]}$`, $options: "i" };
      } else {
        filter.category = {
          $in: categories.map((c) => new RegExp(`^${c}$`, "i")),
        };
      }
    }

    // -- SubCategory filter (supports multiple comma-separated values) --
    if (subCategory) {
      const subCategories = subCategory.split(",").map((c) => c.trim());
      if (subCategories.length === 1) {
        filter.subCategory = { $regex: `^${subCategories[0]}$`, $options: "i" };
      } else {
        filter.subCategory = {
          $in: subCategories.map((c) => new RegExp(`^${c}$`, "i")),
        };
      }
    }

    // -- Brand filter (supports multiple comma-separated values) --
    if (brand) {
      const brands = brand.split(",").map((b) => b.trim());
      if (brands.length === 1) {
        filter.brand = { $regex: `^${brands[0]}$`, $options: "i" };
      } else {
        filter.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, "i")) };
      }
    }

    // -- Price range filter --
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = parseFloat(priceMin);
      if (priceMax) filter.price.$lte = parseFloat(priceMax);
    }

    // -- Rating filter (minimum rating) --
    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }

    // -- Boolean filters --
    if (isPublished !== null && isPublished !== undefined) {
      filter.isPublished = isPublished === "true";
    } else {
      // -- If no explicit isPublished filter, apply access control --
      // Only show unpublished products to admins or owners
      const isAdmin = session?.user?.role === "admin";
      const userId = session?.user?.id;

      if (!isAdmin) {
        // Non-admins can only see:
        // 1. Published products, OR
        // 2. Their own unpublished products
        if (userId) {
          filter.$or = [
            { isPublished: true },
            { isPublished: false, userId: userId },
          ];
        } else {
          // Not logged in - only show published products
          filter.isPublished = true;
        }
      }
      // Admins see all products (no filter added)
    }

    if (isFeatured !== null && isFeatured !== undefined) {
      filter.isFeatured = isFeatured === "true";
    }

    if (isBestSeller !== null && isBestSeller !== undefined) {
      filter.isBestSeller = isBestSeller === "true";
    }

    if (isDeal !== null && isDeal !== undefined) {
      filter.isDeal = isDeal === "true";
    }

    if (freeShipping !== null && freeShipping !== undefined) {
      filter.freeShipping = freeShipping === "true";
    }

    // -- Build sort object --
    let sortObj: Record<string, 1 | -1> = {};

    switch (sort) {
      case "price_asc":
        sortObj = { price: 1 };
        break;
      case "price_desc":
        sortObj = { price: -1 };
        break;
      case "rating":
        sortObj = { rating: -1, numReviews: -1 };
        break;
      case "latest":
      default:
        sortObj = { createdAt: -1 };
        break;
    }

    // -- Execute query with pagination --
    const [products, totalCount] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    // -- Calculate pagination metadata --
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        success: true,
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
