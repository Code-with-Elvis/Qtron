import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/db/mongoose";
import User from "@/lib/modals/userModal";
import Product from "@/lib/modals/productModal";
import Review from "@/lib/modals/reviewModal";
import BrowsingHistory from "@/lib/modals/browsingHistoryModal";
import { adminUserUpdateSchema } from "@/lib/validationSchemas";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await req.json();

    // === Validate request body ===
    const validationResult = adminUserUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: "Invalid data provided" },
        { status: 400 }
      );
    }

    const { name, phone, image, role, isVerified } = validationResult.data;

    // === Check if user exists ===
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // === Build update object (only include fields that are provided) ===
    const updateData: Record<string, string | boolean> = {};
    if (name !== undefined && name.trim() !== "") updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (image !== undefined) updateData.photo = image;
    if (role !== undefined && role.trim() !== "") updateData.role = role;
    if (isVerified !== undefined) updateData.isVerified = isVerified;

    // === Update user ===
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // === Check if user exists ===
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // === Prevent deleting admin users ===
    if (user.role === "admin") {
      return NextResponse.json(
        { message: "Cannot delete admin users" },
        { status: 403 }
      );
    }

    // === Delete all user-related data ===

    // Delete user's products
    await Product.deleteMany({ userId: id });

    // Delete user's reviews
    await Review.deleteMany({ userId: id });

    // Delete user's browsing history
    await BrowsingHistory.deleteOne({ userId: id });

    // === Finally, delete the user account ===
    await User.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user. Please try again." },
      { status: 500 }
    );
  }
}
