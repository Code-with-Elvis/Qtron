import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongoose";
import Product from "@/lib/modals/productModal";

// === GET /api/products/[slug]/related - Get related products ===
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDB();

    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "12"), 20);

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Product slug is required" },
        { status: 400 }
      );
    }

    // Find the current product to get its category, subcategory, and brand
    const currentProduct = await Product.findOne({ slug }).lean();

    if (!currentProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Build filter for related products
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {
      _id: { $ne: currentProduct._id }, // Exclude current product
      isPublished: true,
    };

    // Priority 1: Same subcategory and brand
    // Priority 2: Same subcategory
    // Priority 3: Same category and brand
    // Priority 4: Same category
    const relatedProducts = await Product.find({
      ...filter,
      $or: [
        {
          subCategory: { $in: currentProduct.subCategory },
          brand: currentProduct.brand,
        },
        { subCategory: { $in: currentProduct.subCategory } },
        {
          category: { $in: currentProduct.category },
          brand: currentProduct.brand,
        },
        { category: { $in: currentProduct.category } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        success: true,
        products: relatedProducts,
        count: relatedProducts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch related products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
