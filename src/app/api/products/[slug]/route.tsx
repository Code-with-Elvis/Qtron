import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongoose";
import Product from "@/lib/modals/productModal";

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
