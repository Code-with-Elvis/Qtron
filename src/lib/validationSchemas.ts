import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  brand: z.string().min(2, "Brand must be at least 2 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  subCategory: z
    .array(z.string())
    .min(1, "At least one subcategory is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "Price must be a positive number",
      }
    ),
  listPrice: z
    .string()
    .min(1, "List price is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "List price must be a positive number",
      }
    ),
  countInStock: z
    .string()
    .min(1, "Stock count is required")
    .refine(
      (val) => {
        const num = Number(val);
        return Number.isInteger(num) && num >= 0;
      },
      {
        message: "Count in stock must be a non-negative integer",
      }
    ),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  isPublished: z.boolean(),
  isFeatured: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isDeal: z.boolean().optional(),
  freeShipping: z.boolean().optional(),
  deliveryEstimate: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
});

export const editProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  brand: z.string().min(2, "Brand must be at least 2 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  subCategory: z
    .array(z.string())
    .min(1, "At least one subcategory is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "Price must be a positive number",
      }
    ),
  listPrice: z
    .string()
    .min(1, "List price is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "List price must be a positive number",
      }
    ),
  countInStock: z
    .string()
    .min(1, "Stock count is required")
    .refine(
      (val) => {
        const num = Number(val);
        return Number.isInteger(num) && num >= 0;
      },
      {
        message: "Count in stock must be a non-negative integer",
      }
    ),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  isPublished: z.boolean(),
  isFeatured: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isDeal: z.boolean().optional(),
  freeShipping: z.boolean().optional(),
  deliveryEstimate: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
});

export const userRegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .regex(
        /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/,
        "Full name must contain exactly two names"
      ),
    email: z.email("Please provide a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Weak password"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const userLoginSchema = z.object({
  email: z.email("Please provide a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Weak password"),
});

export const userUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/,
      "Full name must contain exactly two names"
    ),
  email: z
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number")
    .optional()
    .or(z.literal("")),
  image: z.url("Image must be a valid URL").optional().or(z.literal("")),
  // address: z
  //   .object({
  //     street: z.string().optional(),
  //     city: z.string().optional(),
  //     state: z.string().optional(),
  //     country: z.string().optional(),
  //     zipCode: z.string().optional(),
  //   })
  //   .optional(),
});

export const adminUserUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/,
      "Full name must contain exactly two names"
    ),
  email: z
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number")
    .optional()
    .or(z.literal("")),
  image: z.url("Image must be a valid URL").optional().or(z.literal("")),
  role: z.enum(["user", "admin", "seller"], "Invalid role").optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  title: z.string().max(200, "Title cannot exceed 200 characters").optional(),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters long")
    .max(2000, "Comment cannot exceed 2000 characters"),
  images: z.array(z.string()).optional(),
});

export const confirmPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
