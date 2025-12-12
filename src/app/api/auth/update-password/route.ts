import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { connectToDB } from "@/lib/db/mongoose";
import User from "@/lib/modals/userModal";
import { changePasswordSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

// === PUT /api/auth/update-password - Update user password ===
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDB();

    const body = await req.json();

    // Validate request body
    const validatedData = changePasswordSchema.parse(body);

    // Get user with password field
    const user = await User.findById(session.user.id).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordCorrect = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Update password
    user.password = validatedData.newPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully. Please log in again.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update password",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
