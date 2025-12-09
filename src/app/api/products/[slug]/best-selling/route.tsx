import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongoose";
import Product from "@/lib/modals/productModal";

// === GET /api/products/[slug]/best-selling - Get best-selling products from same category ===
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

    // Find the current product to get its category
    const currentProduct = await Product.findOne({ slug }).lean();

    if (!currentProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Find best-selling products from the same category/subcategory
    const bestSellingProducts = await Product.find({
      _id: { $ne: currentProduct._id }, // Exclude current product
      isPublished: true,
      isBestSeller: true,
      $or: [
        { subCategory: { $in: currentProduct.subCategory } },
        { category: { $in: currentProduct.category } },
      ],
    })
      .sort({ ratingsAverage: -1, ratingCount: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        success: true,
        products: bestSellingProducts,
        count: bestSellingProducts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching best-selling products:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch best-selling products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
