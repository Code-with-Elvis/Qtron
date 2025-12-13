import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/db/mongoose";
import User from "@/lib/modals/userModal";

export async function GET(req: NextRequest) {
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

    // === Get query parameters ===
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const skip = (page - 1) * limit;

    // === Build search filter ===
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchFilter: any = {
      role: { $ne: "admin" }, // Exclude admins
    };

    // If search query exists, search by name (first or last name)
    if (query.trim()) {
      searchFilter.$or = [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ];
    }

    // === Get total count for pagination ===
    const totalCount = await User.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalCount / limit);

    // === Fetch users with pagination ===
    const users = await User.find(searchFilter)
      .select("-password") // Exclude password field
      .sort({ createdAt: -1 }) // Latest users first
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users. Please try again." },
      { status: 500 }
    );
  }
}
