import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongoose";
import Product from "@/lib/modals/productModal";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { editProductSchema } from "@/lib/validationSchemas";

// === GET /api/products/[slug] - Get single product by slug ===
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDB();

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Product slug is required" },
        { status: 400 }
      );
    }

    // -- Find product by slug --
    const product = await Product.findOne({ slug, isPublished: true }).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// === PUT /api/products/[slug] - Update product details (without images) ===
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDB();

    // -- Check authentication --
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Product slug is required" },
        { status: 400 }
      );
    }

    // -- Parse request body --
    const body = await req.json();

    // -- Validate data --
    const validationResult = editProductSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: "Invalid product data",
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // -- Find existing product --
    const existingProduct = await Product.findOne({ slug });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // -- Check ownership (unless admin) --
    if (
      session.user.role !== "admin" &&
      existingProduct.userId.toString() !== session.user.id
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden: You don't own this product" },
        { status: 403 }
      );
    }

    // -- Update product (excluding images) --
    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      {
        $set: {
          name: validatedData.name,
          brand: validatedData.brand,
          description: validatedData.description,
          category: validatedData.category,
          subCategory: validatedData.subCategory,
          price: Number(validatedData.price),
          listPrice: Number(validatedData.listPrice),
          countInStock: Number(validatedData.countInStock),
          colors: validatedData.colors,
          isPublished: validatedData.isPublished,
          isFeatured: validatedData.isFeatured ?? false,
          isBestSeller: validatedData.isBestSeller ?? false,
          isDeal: validatedData.isDeal ?? false,
          freeShipping: validatedData.freeShipping ?? false,
          deliveryEstimate: validatedData.deliveryEstimate,
          keywords: validatedData.keywords,
          features: validatedData.features,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Failed to update product" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
