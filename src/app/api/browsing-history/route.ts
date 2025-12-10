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

    // -- Filter out null products (deleted or unpublished) --
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validProducts = history.products.filter((p: any) => p !== null);

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

    // -- Find user's browsing history --
    let history = await BrowsingHistory.findOne({ userId });

    if (!history) {
      // Create new browsing history
      history = await BrowsingHistory.create({
        userId,
        products: [productId],
      });
    } else {
      // -- Remove product if it already exists (to move it to the front) --
      history.products = history.products.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (id: any) => id.toString() !== productId.toString()
      );

      // -- Add product to the beginning of the array --
      history.products.unshift(productId);

      // Keep only the last 24 items
      if (history.products.length > 24) {
        history.products = history.products.slice(0, 24);
      }

      await history.save();
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
