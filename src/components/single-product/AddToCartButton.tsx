"use client";

import { Button } from "../ui/button";
import { MdAddShoppingCart } from "react-icons/md";

const AddToCartButton = ({ productId }: { productId: string }) => {
  function handleAddToCart() {
    console.log(`Product ${productId} added to cart.`);
  }
  return (
    <Button
      size="lg"
      className="w-full mt-4 rounded-full inline-flex lg:hidden"
      onClick={handleAddToCart}
    >
      <MdAddShoppingCart />
      Add to Cart
    </Button>
  );
};
export default AddToCartButton;
