"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { IconX, IconUpload, IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { deleteSingleImage } from "@/app/actions/uploadthingActions";

interface UploadImageInputProps {
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  imageCount: number;
  className?: string;
}

export function UploadImageInput({
  imageUrls,
  setImageUrls,
  imageCount,
  className,
}: UploadImageInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("productImageUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        const urls = res.map((file) => file.ufsUrl);
        setImageUrls([...imageUrls, ...urls]);
        toast.success(`${res.length} image(s) uploaded successfully`);
      }
      setIsUploading(false);
    },
    onUploadError: (error) => {
      setError(error.message);
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
    },
  });

  const validateFiles = (fileList: FileList | File[]): File[] => {
    const validFiles: File[] = [];
    const fileArray = Array.from(fileList);
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    // == Check if adding these files would exceed the limit ==
    if (imageUrls.length + fileArray.length > imageCount) {
      setError(`You can only upload up to ${imageCount} images`);
      toast.error(`You can only upload up to ${imageCount} images`);
      return [];
    }

    for (const file of fileArray) {
      // == Check file type ==
      if (!allowedTypes.includes(file.type)) {
        setError("Only PNG, JPG, JPEG, and WebP images are allowed");
        toast.error("Only PNG, JPG, JPEG, and WebP images are allowed");
        continue;
      }

      // == Check file size (max 4MB for UploadThing) ==
      if (file.size > 4 * 1024 * 1024) {
        setError("Image size should be less than 4MB");
        toast.error("Image size should be less than 4MB");
        continue;
      }

      validFiles.push(file);
    }

    setError("");
    return validFiles;
  };

  const handleFiles = async (fileList: FileList | File[]) => {
    const validFiles = validateFiles(fileList);
    if (validFiles.length === 0) return;

    setIsUploading(true);
    setError("");

    try {
      await startUpload(validFiles);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
      toast.error("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = async (index: number) => {
    const imageUrl = imageUrls[index];

    // Optimistically remove from UI
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setError("");

    // Delete from UploadThing in background
    try {
      const result = await deleteSingleImage(imageUrl);
      if (result.success) {
        toast.success("Image removed and deleted from storage");
      } else {
        toast.warning(
          "Image removed from form but failed to delete from storage"
        );
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.warning(
        "Image removed from form but failed to delete from storage"
      );
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* == Upload Area == */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        className={cn(
          "relative cursor-pointer rounded border-[1.5px] bg-gray-50/10 border-dashed transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50",
          (imageUrls.length >= imageCount || isUploading) &&
            "pointer-events-none opacity-50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={imageUrls.length >= imageCount || isUploading}
        />

        <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
          <div className="rounded-full bg-primary/10 size-12 grid place-items-center">
            {isUploading ? (
              <IconLoader2 className="size-7 animate-spin text-primary" />
            ) : (
              <IconUpload className="size-7 text-primary" />
            )}
          </div>
          <div className="space-y-1">
            <p className="font-medium">
              {isUploading
                ? "Uploading..."
                : isDragging
                ? "Drop images here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, JPEG, WebP up to 4MB ({imageUrls.length}/{imageCount}{" "}
              uploaded)
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Preview Grid */}
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              <Image
                src={imageUrl}
                alt={`Preview ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                aria-label="Remove image"
                disabled={isUploading}
              >
                <IconX className="size-4" />
              </button>
              <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
