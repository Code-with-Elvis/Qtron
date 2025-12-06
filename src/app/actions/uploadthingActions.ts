"use server";

import { deleteUploadThingFiles } from "@/lib/deleteUploadThingFiles";

export async function deleteProductImages(imageUrls: string[]) {
  try {
    const result = await deleteUploadThingFiles(imageUrls);
    return {
      success: result.success,
      message: result.success
        ? `${result.deletedCount} image(s) deleted successfully`
        : "Failed to delete images",
    };
  } catch (error) {
    console.error("Error in deleteProductImages:", error);
    return {
      success: false,
      message: "An error occurred while deleting images",
    };
  }
}

export async function deleteSingleImage(imageUrl: string) {
  try {
    const result = await deleteUploadThingFiles([imageUrl]);
    return {
      success: result.success,
      message: result.success
        ? "Image deleted successfully"
        : "Failed to delete image",
    };
  } catch (error) {
    console.error("Error in deleteSingleImage:", error);
    return {
      success: false,
      message: "An error occurred while deleting the image",
    };
  }
}
