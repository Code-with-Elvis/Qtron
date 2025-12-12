import { NextRequest, NextResponse } from "next/server";
import BrowsingHistory from "@/lib/modals/browsingHistoryModal";
import Product from "@/lib/modals/productModal";
import { connectToDB } from "@/lib/db/mongoose";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const excludeSlug = searchParams.get("excludeSlug");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const history = await BrowsingHistory.findOne({ userId })
      .populate({
        path: "products",
        match: { isPublished: true },
        select:
          "name slug price listPrice images brand category subCategory ratingsAverage ratingCount isBestSeller isDeal freeShipping",
      })
      .lean();

    if (!history) {
      return NextResponse.json({
        products: [],
      });
    }

    // -- Filter out null products (deleted or unpublished) and excluded slug --
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let validProducts = history.products.filter((p: any) => p !== null);

    // -- Exclude current product if excludeSlug is provided --
    if (excludeSlug) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validProducts = validProducts.filter((p: any) => p.slug !== excludeSlug);
    }

    return NextResponse.json({
      products: validProducts,
    });
  } catch (error) {
    console.error("Error fetching browsing history:", error);
    return NextResponse.json(
      { error: "Failed to fetch browsing history" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { userId, productSlug } = await req.json();

    if (!userId || !productSlug) {
      return NextResponse.json(
        { error: "User ID and Product Slug are required" },
        { status: 400 }
      );
    }

    // -- Find product by slug --
    const product = await Product.findOne({
      slug: productSlug,
      isPublished: true,
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productId = product._id;

    // -- Check if history exists --
    const existingHistory = await BrowsingHistory.findOne({ userId });

    if (!existingHistory) {
      // Create new history document
      await BrowsingHistory.create({
        userId,
        products: [productId],
      });
    } else {
      // Remove product if it exists, add to front, and limit to 24
      const filteredProducts = existingHistory.products.filter(
        (id: string) => id.toString() !== productId.toString()
      );

      const updatedProducts = [productId, ...filteredProducts].slice(0, 24);

      existingHistory.products = updatedProducts;
      await existingHistory.save();
    }

    return NextResponse.json({
      success: true,
      message: "Browsing history updated",
    });
  } catch (error) {
    console.error("Error saving browsing history:", error);
    return NextResponse.json(
      { error: "Failed to save browsing history" },
      { status: 500 }
    );
  }
}
