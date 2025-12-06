import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Product from "@/lib/modals/productModal";
import { productSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import { connectToDB } from "@/lib/db/mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import slugify from "slugify";

// === POST /api/products - Create a new product ===

export async function POST(req: NextRequest) {
  try {
    // -- Check authentication --
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // -- Parse request body --
    const body = await req.json();

    // -- Validate data with Zod --
    const validatedData = productSchema.parse(body);

    // -- Connect to database --
    await connectToDB();

    // -- Get userId from session --
    const userId = session.user.id as string;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID not found in session" },
        { status: 400 }
      );
    }

    // -- Generate slug from product name --
    const slug = slugify(validatedData.name, { lower: true, strict: true });

    // -- Create product with userId and slug --
    const product = await Product.create({
      ...validatedData,
      userId,
      slug,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);

    // -- Handle Zod validation errors --
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    // -- Handle duplicate key errors (e.g., slug already exists) --
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A product with this name already exists",
        },
        { status: 409 }
      );
    }

    // -- Handle other errors --
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
