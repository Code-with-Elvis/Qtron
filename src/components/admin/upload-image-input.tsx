"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { IconX, IconUpload } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface UploadImageInputProps {
  setImages: (images: File[]) => void;
  previews: string[];
  setPreviews: (previews: string[]) => void;
  imageCount: number;
  className?: string;
}

export function UploadImageInput({
  setImages,
  previews,
  setPreviews,
  imageCount,
  className,
}: UploadImageInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const validateFiles = (fileList: FileList | File[]): File[] => {
    const validFiles: File[] = [];
    const fileArray = Array.from(fileList);
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    // == Check if adding these files would exceed the limit ==
    if (previews.length + fileArray.length > imageCount) {
      setError(`You can only upload up to ${imageCount} images`);
      return [];
    }

    for (const file of fileArray) {
      // == Check file type ==
      if (!allowedTypes.includes(file.type)) {
        setError("Only PNG, JPG, JPEG, and WebP images are allowed");
        continue;
      }

      // == Check file size (max 5MB) ==
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        continue;
      }

      validFiles.push(file);
    }

    setError("");
    return validFiles;
  };

  const handleFiles = (fileList: FileList | File[]) => {
    const validFiles = validateFiles(fileList);
    if (validFiles.length === 0) return;

    const newFiles = [...files, ...validFiles];
    setFiles(newFiles);
    setImages(newFiles);

    // == Create preview URLs ==
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
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

  const removeImage = (index: number) => {
    // == Revoke the URL to free up memory ==
    URL.revokeObjectURL(previews[index]);

    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);

    setPreviews(newPreviews);
    setFiles(newFiles);
    setImages(newFiles);
    setError("");

    // === Reset file input ===
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
          previews.length >= imageCount && "pointer-events-none opacity-50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={previews.length >= imageCount}
        />

        <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
          <div className="rounded-full bg-primary/10 size-12 grid place-items-center">
            <IconUpload className="size-7 text-primary" />
          </div>
          <div className="space-y-1">
            <p className=" font-medium">
              {isDragging
                ? "Drop images here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, JPEG, WebP up to 5MB ({previews.length}/{imageCount}{" "}
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
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
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
