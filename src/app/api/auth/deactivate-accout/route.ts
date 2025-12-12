import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/lib/modals/userModal";
import bcrypt from "bcryptjs";
import { confirmPasswordSchema } from "@/lib/validationSchemas";
import { connectToDB } from "@/lib/db/mongoose";

// PUT /api/auth/deactivate-account - Deactivate user account (soft delete)
export async function PUT(req: Request) {
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

    // Toggle account active status
    const newActiveStatus = !user.active;
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { active: newActiveStatus },
      { new: true }
    );

    return NextResponse.json(
      {
        message: newActiveStatus
          ? "Account activated successfully."
          : "Account deactivated successfully. You can reactivate it anytime.",
        active: updatedUser?.active,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deactivating account:", error);

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
