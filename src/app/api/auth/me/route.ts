import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { connectToDB } from "@/lib/db/mongoose";
import User from "@/lib/modals/userModal";
import { userUpdateSchema } from "@/lib/validationSchemas";
import { z } from "zod";

// === GET /api/auth/me - Get current user details ===
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDB();

    const user = await User.findById(session.user.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// === PUT /api/auth/me - Update current user details ===
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
    const validatedData = userUpdateSchema.parse(body);

    // Validate image URL if provided
    if (validatedData.image && validatedData.image !== "") {
      const allowedHostnames = [
        "utfs.io",
        "vye2wc9mk1.ufs.sh",
        "images.unsplash.com",
        "plus.unsplash.com",
        "images.pexels.com",
        "img.freepik.com",
        "freepik.com",
        "static.freepik.com",
        "cdn.pixabay.com",
      ];

      const isAllowed = allowedHostnames.some((hostname) =>
        validatedData.image!.includes(hostname)
      );

      if (!isAllowed) {
        return NextResponse.json(
          {
            success: false,
            message: "Image URL is not from an allowed source",
          },
          { status: 400 }
        );
      }
    }

    // Build update object
    const updateData: Record<string, string> = {
      name: validatedData.name,
    };

    if (validatedData.phone && validatedData.phone !== "") {
      updateData.phone = validatedData.phone;
    }

    if (validatedData.image && validatedData.image !== "") {
      updateData.photo = validatedData.image;
    }

    // Update user and return updated document
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);

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
        message: "Failed to update user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
