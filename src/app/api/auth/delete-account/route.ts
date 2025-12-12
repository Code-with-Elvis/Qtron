import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/lib/modals/userModal";
import Product from "@/lib/modals/productModal";
import Review from "@/lib/modals/reviewModal";
import BrowsingHistory from "@/lib/modals/browsingHistoryModal";
import bcrypt from "bcryptjs";
import { confirmPasswordSchema } from "@/lib/validationSchemas";
import { connectToDB } from "@/lib/db/mongoose";

// DELETE /api/auth/delete-account - Permanently delete user account
export async function DELETE(req: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized. Please login to continue" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = confirmPasswordSchema.parse(body);

    // Connect to database
    await connectToDB();

    // Get user with password
    const user = await User.findById(session.user.id).select("+password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    // Delete all user-related data
    // Note: In production, you might want to handle this in a background job
    // or keep some data for analytics/legal reasons

    // Delete user's products
    await Product.deleteMany({ userId: session.user.id });

    // Delete user's reviews
    await Review.deleteMany({ userId: session.user.id });

    // Delete user's browsing history
    await BrowsingHistory.deleteOne({ userId: session.user.id });

    // Finally, delete the user account
    await User.findByIdAndDelete(session.user.id);

    return NextResponse.json(
      {
        message: "Account deleted permanently. All your data has been removed.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting account:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { message: "Validation error", error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Something went wrong. Please try again later",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
