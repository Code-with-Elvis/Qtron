"use client";

import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Badge } from "../ui/badge";

const InputTags = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = input.trim();

      if (
        newTag &&
        !tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase()) //=== check uniqueness (case-insensitive)
      ) {
        setTags([...tags, newTag]); // === Save with original casing
      }

      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex items-center flex-wrap gap-2 border-neutral-300 border rounded px-3 py-2 focus-within:ring-[3px] focus-within:border-ring focus-within:ring-ring/50">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          className="flex items-center gap-1 py-1 px-2 text-sm font-normal"
        >
          {tag}
          <button
            onClick={() => removeTag(tag)}
            type="button"
            className="hover:text-destructive ml-1"
          >
            <LiaTimesSolid
              className="size-3
                "
            />
          </button>
        </Badge>
      ))}

      {/* Input looks like it's inside */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          tags.length === 0 ? "Type a tag and press Enter or comma" : ""
        }
        className="text-sm flex-1 min-w-[120px] border-none focus:ring-0 focus:outline-none bg-transparent py-1 placeholder:text-muted-foreground"
      />
    </div>
  );
};
export default InputTags;
