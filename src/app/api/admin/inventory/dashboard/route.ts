import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/db/mongoose";
import Product from "@/lib/modals/productModal";

export async function GET() {
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

    // === Calculate dashboard metrics ===

    // Total Products
    const totalProducts = await Product.countDocuments();

    // Out of Stock Items
    const outOfStock = await Product.countDocuments({ countInStock: 0 });

    // Low Stock Items (1-10 units)
    const lowStock = await Product.countDocuments({
      countInStock: { $gt: 0, $lte: 10 },
    });

    // In Stock Items (> 10 units)
    const inStock = await Product.countDocuments({
      countInStock: { $gt: 10 },
    });

    // Total Inventory Value
    // Sum of (price × countInStock) for all products
    const inventoryValueResult = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: { $multiply: ["$price", "$countInStock"] },
          },
        },
      },
    ]);

    const totalInventoryValue =
      inventoryValueResult.length > 0 ? inventoryValueResult[0].totalValue : 0;

    // === Get recent low stock products for alerts ===
    const lowStockProducts = await Product.find({
      countInStock: { $gt: 0, $lte: 10 },
    })
      .select("name countInStock images")
      .sort({ countInStock: 1 })
      .limit(5)
      .lean();

    // === Get recently out of stock products ===
    const recentlyOutOfStock = await Product.find({
      countInStock: 0,
    })
      .select("name images updatedAt")
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean();

    // === Calculate stock distribution by category ===
    const stockByCategory = await Product.aggregate([
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$category",
          totalStock: { $sum: "$countInStock" },
          productCount: { $sum: 1 },
        },
      },
      {
        $sort: { totalStock: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return NextResponse.json(
      {
        metrics: {
          totalProducts,
          inStock,
          lowStock,
          outOfStock,
          totalInventoryValue: parseFloat(totalInventoryValue.toFixed(2)),
        },
        alerts: {
          lowStockProducts: lowStockProducts.map((p) => ({
            ...p,
            image: p.images[0] || null,
          })),
          recentlyOutOfStock: recentlyOutOfStock.map((p) => ({
            ...p,
            image: p.images[0] || null,
          })),
        },
        insights: {
          stockByCategory,
          lowStockPercentage: totalProducts
            ? parseFloat(((lowStock / totalProducts) * 100).toFixed(2))
            : 0,
          outOfStockPercentage: totalProducts
            ? parseFloat(((outOfStock / totalProducts) * 100).toFixed(2))
            : 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard metrics. Please try again." },
      { status: 500 }
    );
  }
}
