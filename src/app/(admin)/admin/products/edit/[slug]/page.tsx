"use client";

import InputDetailedTags from "@/components/admin/InputDetailedTags";
import InputTags from "@/components/admin/InputTags";
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
import { editProductSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const EditDetails = () => {
  const router = useRouter();
  const slug = useParams().slug as string;
  const [charCount, setCharCount] = useState(800);
  const [categories, setCategories] = useState<string[]>([]);
  const [subCat, setSubCat] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      isPublished: false,
      isFeatured: false,
      isBestSeller: false,
      isDeal: false,
      freeShipping: false,
      category: [],
      subCategory: [],
      colors: [],
      keywords: [],
      features: [],
    },
  });

  // == Sync state with form values ==
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
    async function fetchProductData() {
      try {
        setIsFetching(true);
        const res = await axios.get(`/api/products/${slug}`);

        if (res.status === 200) {
          const product = res.data.product;
          // Populate form fields
          reset({
            name: product.name,
            brand: product.brand,
            description: product.description,
            price: product.price.toString(),
            listPrice: product.listPrice ? product.listPrice.toString() : "",
            countInStock: product.countInStock.toString(),
            deliveryEstimate: product.deliveryEstimate || "",
            isPublished: product.isPublished,
            isFeatured: product.isFeatured || false,
            isBestSeller: product.isBestSeller || false,
            isDeal: product.isDeal || false,
            freeShipping: product.freeShipping || false,
          });
          setCategories(product.category);
          setSubCat(product.subCategory);
          setColors(product.colors);
          setKeywords(product.keywords || []);
          setFeatures(product.features || []);
          setCharCount(800 - product.description.length);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Failed to load product data.");
        router.back();
      } finally {
        setIsFetching(false);
      }
    }
    fetchProductData();
  }, [reset, router, slug]);

  const onSubmit = async (data: z.infer<typeof editProductSchema>) => {
    try {
      setIsSubmitting(true);
      const res = await axios.put(`/api/products/${slug}`, data);
      if (res.status === 200) {
        toast.success("Product updated successfully!");
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
        <p className="animate-pulse">Fetching product data...</p>
      </section>
    );
  }

  return (
    <section>
      {" "}
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
              {isSubmitting ? "Updating..." : "Update Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
};
export default EditDetails;
