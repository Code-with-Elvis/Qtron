import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/db/mongoose";
import Product from "@/lib/modals/productModal";

export async function GET(req: NextRequest) {
  try {
    // === Check if user is authenticated and is an admin ===
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    await connectToDB();

    // === Get query parameters ===
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const stockStatus = searchParams.get("stockStatus") || ""; // all, inStock, lowStock, outOfStock
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const skip = (page - 1) * limit;

    // === Build search filter ===
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchFilter: any = {};

    // Search across multiple fields (case-insensitive)
    if (query.trim()) {
      searchFilter.$or = [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { subCategory: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { keywords: { $in: [new RegExp(query, "i")] } },
        { slug: { $regex: query, $options: "i" } },
      ];
    }

    // Filter by category (supports multiple comma-separated values)
    if (category.trim()) {
      const categories = category.split(",").map((c) => c.trim());
      if (categories.length === 1) {
        searchFilter.category = { $regex: `^${categories[0]}$`, $options: "i" };
      } else {
        searchFilter.category = {
          $in: categories.map((c) => new RegExp(`^${c}$`, "i")),
        };
      }
    }

    // Filter by stock status
    if (stockStatus === "outOfStock") {
      searchFilter.countInStock = 0;
    } else if (stockStatus === "lowStock") {
      searchFilter.countInStock = { $gt: 0, $lte: 10 };
    } else if (stockStatus === "inStock") {
      searchFilter.countInStock = { $gt: 10 };
    }

    // === Get total count for pagination ===
    const totalCount = await Product.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalCount / limit);

    // === Fetch products with pagination ===
    const products = await Product.find(searchFilter)
      .select(
        "name slug brand images price listPrice countInStock category isPublished createdAt updatedAt"
      )
      .sort({ updatedAt: -1 }) // Latest updated first
      .skip(skip)
      .limit(limit)
      .lean();

    // === Add stock status to each product ===
    const productsWithStatus = products.map((product) => {
      let stockStatus = "In Stock";
      let stockBadgeVariant: "outline" | "destructive" | "secondary" =
        "outline";

      if (product.countInStock === 0) {
        stockStatus = "Out of Stock";
        stockBadgeVariant = "destructive";
      } else if (product.countInStock <= 10) {
        stockStatus = "Low Stock";
        stockBadgeVariant = "secondary";
      }

      // Calculate inventory value for this product
      const inventoryValue = product.price * product.countInStock;

      return {
        ...product,
        stockStatus,
        stockBadgeVariant,
        inventoryValue,
        needsRestock: product.countInStock <= 10,
        image: product.images[0] || null,
      };
    });

    return NextResponse.json(
      {
        products: productsWithStatus,
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
    console.error("Error fetching inventory:", error);
    return NextResponse.json(
      { message: "Failed to fetch inventory. Please try again." },
      { status: 500 }
    );
  }
}
