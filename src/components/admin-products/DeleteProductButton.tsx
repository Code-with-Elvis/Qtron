"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const DeleteProductButton = ({ productSlug }: { productSlug: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/api/products/${productSlug}`);
      if (response.data.success) {
        toast.success("Product deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          toast.error("Validation error: Please check your input.");
        } else if (status === 403) {
          router.push("/");
          toast.error("You do not have permission to edit this product.");
        } else if (status === 401) {
          router.push("/");
          toast.error("Please sign in to continue.");
        } else {
          toast.error("Failed to update product. Please try again.");
        }
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon-sm" disabled={isDeleting}>
          {isDeleting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <RiDeleteBin5Line />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteProductButton;
