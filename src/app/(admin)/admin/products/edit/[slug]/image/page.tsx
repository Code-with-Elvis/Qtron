"use client";

import { UploadImageInput } from "@/components/admin/upload-image-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const productSchema = z.object({
  images: z.array(z.string()).min(1, "At least one image is required"),
});

const EditImage = () => {
  const router = useRouter();
  const slug = useParams().slug;
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [oldImageUrls, setOldImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
    },
  });

  useEffect(() => {
    setValue("images", imageUrls);
  }, [imageUrls, setValue]);

  useEffect(() => {
    async function fetchProductData() {
      try {
        setIsFetching(true);
        const res = await axios.get(`/api/products/${slug}/product-images`);
        if (res.data.success) {
          setOldImageUrls(res.data.images);
        }
      } catch (error) {
        console.error("Error fetching product images:", error);
        toast.error("Failed to fetch product images");
        router.back();
      } finally {
        setIsFetching(false);
      }
    }

    fetchProductData();
  }, [slug, router]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      setIsSubmitting(true);
      const res = await axios.put(`/api/products/${slug}/product-images`, data);
      if (res.data.success) {
        toast.success("Product images updated successfully");
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          toast.error("Validation error: Please check your input.");
        } else if (status === 403) {
          router.push("/admin/products");
          toast.error("You do not have permission to edit this product.");
        } else if (status === 401) {
          router.push("/");
          toast.error("Please sign in to continue.");
        } else {
          toast.error("Failed to update product. Please try again.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return (
      <section className="flex gap-2 justify-center items-center h-60">
        <Loader className="size-8 animate-spin text-primary" />
        <p className="animate-pulse">Fetching product images...</p>
      </section>
    );
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="rounded-sm shadow-none">
          <CardContent>
            {/*-- Images --*/}

            {oldImageUrls.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Existing Images:</h3>
                <div className="flex flex-wrap gap-4">
                  {oldImageUrls.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Existing Image ${index + 1}`}
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-2">
              <UploadImageInput
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
                imageCount={5}
              />
              {errors.images && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.images.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              size={"lg"}
              className="rounded min-w-60"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader className="size-5 animate-spin" />}
              {isSubmitting ? "Updating..." : "Update Product Images"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
};
export default EditImage;
