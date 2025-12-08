import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/modals/productModal";
import { connectToDB } from "@/lib/db/mongoose";

// === GET /api/products/best-selling - Get best-selling products ===

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    // -- Limit parameter (default: 12, max: 50) --
    const limit = Math.max(
      1,
      Math.min(50, parseInt(searchParams.get("limit") || "12"))
    );

    // -- Fetch best-selling products --
    const products = await Product.find({
      isPublished: true,
      isBestSeller: true,
    })
      .sort({ ratingsAverage: -1, ratingCount: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        success: true,
        products,
        count: products.length,
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
