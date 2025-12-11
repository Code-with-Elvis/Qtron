import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongoose";
import Product from "@/lib/modals/productModal";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteUploadThingFiles } from "@/lib/deleteUploadThingFiles";

// Validation schema for image updates
const updateImagesSchema = z.object({
  images: z.array(z.string()).min(1, "At least one image is required"),
});

// === GET /api/products/[slug]/product-images - Get product images ===
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

    // -- Find product --
    const product = await Product.findOne({ slug })
      .select("images name slug")
      .lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        images: product.images,
        productName: product.name,
        slug: product.slug,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product images:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product images",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// === PUT /api/products/[slug]/product-images - Update product images ===
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
    const validationResult = updateImagesSchema.safeParse(body);
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

    const { images } = validationResult.data;

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

    // -- Store old images for deletion --
    const oldImages = existingProduct.images || [];

    // -- Update product images --
    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      { $set: { images } },
      { new: true, runValidators: true }
    ).select("images name slug");

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Failed to update product images" },
        { status: 500 }
      );
    }

    // -- Delete old images from UploadThing (in background) --
    if (oldImages.length > 0) {
      // Run deletion in background without blocking the response
      deleteUploadThingFiles(oldImages).catch((error) => {
        console.error("Failed to delete old images from UploadThing:", error);
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product images updated successfully",
        images: updatedProduct.images,
        productName: updatedProduct.name,
        slug: updatedProduct.slug,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product images:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product images",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
