"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";

const InputDetailedTags = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag.trim()]);
    } else {
      toast.warning("Tag is empty or already exists");
    }
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div>
      {/*-- Input --*/}
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter product feature"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded border-neutral-300"
        />
        <Button
          type="button"
          onClick={() => {
            handleAddTag(inputValue);
            setInputValue("");
          }}
          className="rounded"
        >
          <Plus /> Add
        </Button>
      </div>
      {/*-- Tags List --*/}
      <ul className="mt-2">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="rounded border-b last:border-b-0 flex items-center gap-2 px-2 py-1"
          >
            <span className="flex-1 text-sm">{tag}</span>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={() => handleRemoveTag(tag)}
              className="rounded"
            >
              <LiaTimesSolid />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default InputDetailedTags;
