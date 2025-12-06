import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

/**
 * Delete files from UploadThing by their URLs or file keys
 * @param files - Array of full URLs or file keys to delete
 * @returns Promise with deletion result
 */
export async function deleteUploadThingFiles(
  files: string[]
): Promise<{ success: boolean; deletedCount: number }> {
  try {
    if (!files || files.length === 0) {
      return { success: true, deletedCount: 0 };
    }

    // Extract file keys from URLs
    // UploadThing URLs are in format: https://vye2wc9mk1.ufs.sh/f/{fileKey}
    const fileKeys = files.map((file) => {
      if (file.includes("/f/")) {
        // Extract the file key from the URL
        return file.split("/f/")[1];
      }
      // If it's already a file key, return as is
      return file;
    });

    // Delete files using UTApi
    await utapi.deleteFiles(fileKeys);

    return {
      success: true,
      deletedCount: fileKeys.length,
    };
  } catch (error) {
    console.error("Error deleting UploadThing files:", error);
    return {
      success: false,
      deletedCount: 0,
    };
  }
}

/**
 * Delete a single file from UploadThing
 * @param file - Full URL or file key to delete
 * @returns Promise with deletion result
 */
export async function deleteUploadThingFile(
  file: string
): Promise<{ success: boolean }> {
  const result = await deleteUploadThingFiles([file]);
  return { success: result.success };
}
