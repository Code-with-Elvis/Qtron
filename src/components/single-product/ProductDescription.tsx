"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const ProductDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const CHAR_LIMIT = 300;

  const shouldTruncate = description.length > CHAR_LIMIT;
  const displayText =
    isExpanded || !shouldTruncate
      ? description
      : `${description.slice(0, CHAR_LIMIT)}...`;

  return (
    <div className="space-y-2">
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {displayText}
      </p>
      {shouldTruncate && (
        <Button
          variant="link"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 h-auto font-semibold text-primary"
        >
          {isExpanded ? "See less" : "See more"}
        </Button>
      )}
    </div>
  );
};
export default ProductDescription;
