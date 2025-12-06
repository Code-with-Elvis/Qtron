"use client";

import InputDetailedTags from "@/components/admin/InputDetailedTags";
import InputTags from "@/components/admin/InputTags";
import { UploadImageInput } from "@/components/admin/upload-image-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { productSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import z from "zod";
import { Loader } from "lucide-react";

const CreateProduct = () => {
  const router = useRouter();
  const [charCount, setCharCount] = useState(800);
  const [categories, setCategories] = useState<string[]>([]);
  const [subCat, setSubCat] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isPublished: false,
      isFeatured: false,
      isBestSeller: false,
      isDeal: false,
      freeShipping: false,
      category: [],
      subCategory: [],
      colors: [],
      images: [],
      keywords: [],
      features: [],
    },
  });

  // Sync state with form values
  useEffect(() => {
    setValue("category", categories);
  }, [categories, setValue]);

  useEffect(() => {
    setValue("subCategory", subCat);
  }, [subCat, setValue]);

  useEffect(() => {
    setValue("colors", colors);
  }, [colors, setValue]);

  useEffect(() => {
    setValue("keywords", keywords);
  }, [keywords, setValue]);

  useEffect(() => {
    setValue("features", features);
  }, [features, setValue]);

  useEffect(() => {
    setValue("images", imageUrls);
  }, [imageUrls, setValue]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/products", data);

      if (response.data.success) {
        toast.success(response.data.message || "Product created successfully");
        router.push("/admin/products");
        router.refresh();
      } else {
        throw new Error(response.data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);

      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        // -- Handle Zod validation errors --
        const errors = error.response.data.errors;
        errors.forEach((err: { path: string[]; message: string }) => {
          toast.error(`${err.path.join(".")}: ${err.message}`);
        });
      } else if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create product. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="rounded-sm shadow-none">
          <CardContent>
            {/*-- Name --*/}

            <div className="mb-2">
              <Label htmlFor="name" className="text-sm ml-1 mb-1">
                Name:
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter product name"
                {...register("name")}
                className={`rounded ${
                  errors.name ? "border-red-400" : "border-neutral-300"
                }`}
              />
              {errors.name && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.name.message}
                </p>
              )}
            </div>
            {/*-- Brand --*/}

            <div className="mb-2">
              <Label htmlFor="brand" className="text-sm ml-1 mb-1">
                Brand:
              </Label>
              <Input
                type="text"
                id="brand"
                placeholder="Enter product brand"
                {...register("brand")}
                className={`rounded ${
                  errors.brand ? "border-red-400" : "border-neutral-300"
                }`}
              />
              {errors.brand && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.brand.message}
                </p>
              )}
            </div>
            {/*-- Description --*/}

            <div className="mb-2">
              <Label htmlFor="description" className="text-sm ml-1 mb-1">
                Description:
              </Label>
              <InputGroup
                className={`rounded ${
                  errors.description ? "border-red-400" : "border-neutral-300"
                }`}
              >
                <InputGroupTextarea
                  placeholder="Enter product description"
                  {...register("description")}
                  id="description"
                  maxLength={800}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCharCount(800 - value.length);
                  }}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-muted-foreground text-xs">
                    {charCount} characters left
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.description && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.description.message}
                </p>
              )}
            </div>
            {/*-- Categories --*/}

            <div className="mb-2">
              <h4 className="text-sm font-medium ml-1 mb-1">Categories:</h4>
              <InputTags tags={categories} setTags={setCategories} />
              {errors.category && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.category.message}
                </p>
              )}
            </div>
            {/*-- Sub Categories --*/}

            <div className="mb-2">
              <h4 className="text-sm font-medium ml-1 mb-1">Sub Categories:</h4>
              <InputTags tags={subCat} setTags={setSubCat} />
              {errors.subCategory && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.subCategory.message}
                </p>
              )}
            </div>
            {/*-- Price --*/}

            <div className="mb-2">
              <Label htmlFor="price" className="text-sm ml-1 mb-1">
                Price:
              </Label>
              <Input
                type="text"
                id="price"
                placeholder="Enter product price"
                {...register("price")}
                className={`rounded ${
                  errors.price ? "border-red-400" : "border-neutral-300"
                }`}
              />
              {errors.price && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.price.message}
                </p>
              )}
            </div>
            {/*-- List Price --*/}

            <div className="mb-2">
              <Label htmlFor="list-price" className="text-sm ml-1 mb-1">
                List Price:
              </Label>
              <Input
                type="text"
                id="list-price"
                placeholder="Enter product list price"
                {...register("listPrice")}
                className={`rounded ${
                  errors.listPrice ? "border-red-400" : "border-neutral-300"
                }`}
              />
              {errors.listPrice && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.listPrice.message}
                </p>
              )}
            </div>
            {/*-- Count In Stock --*/}

            <div className="mb-2">
              <Label htmlFor="stock-count" className="text-sm ml-1 mb-1">
                Count In Stock:
              </Label>
              <Input
                type="text"
                id="stock-count"
                placeholder="Enter stock count"
                {...register("countInStock")}
                className={`rounded ${
                  errors.countInStock ? "border-red-400" : "border-neutral-300"
                }`}
              />
              {errors.countInStock && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.countInStock.message}
                </p>
              )}
            </div>
            {/*-- Images --*/}

            <div className="mb-2">
              <h4 className="text-sm font-medium ml-1 mb-1">Images:</h4>
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

            {/*-- Colors --*/}

            <div className="mb-2">
              <h4 className="text-sm font-medium ml-1 mb-1">Colors:</h4>
              <InputTags tags={colors} setTags={setColors} />
              {errors.colors && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.colors.message}
                </p>
              )}
            </div>

            {/*-- Keywords --*/}

            <div className="mb-2">
              <h4 className="text-sm font-medium ml-1 mb-1">
                Keywords (Optional):
              </h4>
              <InputTags tags={keywords} setTags={setKeywords} />
            </div>

            {/*-- Delivery Estimate --*/}
            <div className="mb-2">
              <Label htmlFor="delivery-estimate" className="text-sm ml-1 mb-1">
                Delivery Estimate (Optional):
              </Label>
              <Input
                type="text"
                id="delivery-estimate"
                placeholder="e.g., 3-5 business days"
                {...register("deliveryEstimate")}
                className={`rounded ${
                  errors.deliveryEstimate
                    ? "border-red-400"
                    : "border-neutral-300"
                }`}
              />
              {errors.deliveryEstimate && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.deliveryEstimate.message}
                </p>
              )}
            </div>

            {/*-- Features --*/}
            <div className="mb-2">
              <h4 className="text-sm font-medium ml-1 mb-1">
                Features (Optional):
              </h4>
              <InputDetailedTags tags={features} setTags={setFeatures} />
            </div>

            {/*-- Extra Details --*/}

            <div className="mb-2">
              <h4 className="text-sm font-medium ml-1 mb-1">
                Extra Details (Optional):
              </h4>
              <div className="border-neutral-300 border p-4 rounded flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Controller
                    name="isPublished"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="published"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="published" className="text-muted-foreground">
                    Published
                  </Label>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Controller
                    name="isFeatured"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="featured"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="featured" className="text-muted-foreground">
                    Featured
                  </Label>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Controller
                    name="isBestSeller"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="bestseller"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="bestseller" className="text-muted-foreground">
                    Bestseller
                  </Label>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Controller
                    name="isDeal"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="deal"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="deal" className="text-muted-foreground">
                    Deal
                  </Label>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Controller
                    name="freeShipping"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="freeShipping"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label
                    htmlFor="freeShipping"
                    className="text-muted-foreground"
                  >
                    Free Shipping
                  </Label>
                </div>
              </div>
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
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
};
export default CreateProduct;
