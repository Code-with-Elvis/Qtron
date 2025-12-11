import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongoose";
import Product from "@/lib/modals/productModal";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { editProductSchema } from "@/lib/validationSchemas";
import { deleteUploadThingFiles } from "@/lib/deleteUploadThingFiles";

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

    // -- Get session to check if user is owner or admin --
    const session = await getServerSession(authOptions);

    // -- Find product by slug --
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // -- Check access permissions --
    // If product is unpublished, only allow owner or admin
    if (!product.isPublished) {
      if (!session) {
        // No session means not logged in - deny access to unpublished products
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }

      const isOwner = session.user?.id === product.userId.toString();
      const isAdmin = session.user?.role === "admin";

      if (!isOwner && !isAdmin) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }
    }
    // If product is published, allow anyone to view it

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

// === DELETE /api/products/[slug] - Delete product by slug ===
export async function DELETE(
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

    // -- Check authentication --
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // -- Find product --
    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // -- Check ownership (only owner or admin can delete) --
    const isOwner = session.user.id === product.userId.toString();
    const isAdmin = session.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, message: "Forbidden: You don't own this product" },
        { status: 403 }
      );
    }

    // -- Store images for deletion --
    const imagesToDelete = product.images || [];

    // -- Delete product from database --
    await Product.findOneAndDelete({ slug });

    // -- Delete images from UploadThing in background --
    if (imagesToDelete.length > 0) {
      deleteUploadThingFiles(imagesToDelete).catch((error) => {
        console.error("Error deleting images from UploadThing:", error);
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
