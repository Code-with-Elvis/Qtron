"use client";

import { useEffect, useState } from "react";
import { useProductOptionsStore } from "@/store/useProductOptionsStore";
import { Check } from "lucide-react";

interface ColorVariantsProps {
  colors: string[];
}

// === Map color names to hex/tailwind colors for visual display ===
const colorMap: Record<string, string> = {
  Black: "#000000",
  "Titanium Black": "#1F2937",
  "Matte Black": "#111827",
  White: "#FFFFFF",
  "Glacier White": "#F9FAFB",
  Red: "#EF4444",
  "Empire Red": "#DC2626",
  "Passion Red": "#B91C1C",
  "Aqua Sky": "#0EA5E9",
  Blue: "#3B82F6",
  "Ice Blue": "#93C5FD",
  "Blue Velvet": "#1D4ED8",
  Green: "#10B981",
  Charcoal: "#374151",
  "Deep Sea Blue": "#2563EB",
  Yellow: "#FBBF24",
  Pink: "#EC4899",
  "Midnight Blue": "#191970",
  Blackout: "#000000",
  "Pink Dawn": "#F9A8D4",
  Purple: "#A855F7",
  Orange: "#F97316",
  Porcelain: "#F3F4F6",
  Gray: "#6B7280",
  Grey: "#6B7280",
  "Space Gray": "#4B5563",
  "Elipse Gray": "#6B7280",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Graphic: "#9CA3AF",
  Graphite: "#374151",
  Rose: "#F43F5E",
  Lavender: "#C084FC",
  "Lavender Cream": "#E9D5FF",
  Indigo: "#6366F1",
  Navy: "#1E3A8A",
  "Space Blue": "#1E40AF",
  "Navy Blue": "#1E40AF",
  Brown: "#92400E",
  Bay: "#A16207",
  Beige: "#F5F5DC",
  Turquoise: "#14B8A6",
  Maroon: "#7F1D1D",
  Midnight: "#121063",
  "Midnight Black": "#0F172A",
  Olive: "#65A30D",
  Obsidian: "#1E293B",
  Cyan: "#06B6D4",
  Magenta: "#D946EF",
  "Stainless Steel": "#C0C0C0",
  Starlight: "#F3F4F6",
  "Carbon Gray": "#4B5563",
};

const ColorVariants = ({ colors }: ColorVariantsProps) => {
  const { setSelectedColor } = useProductOptionsStore();
  const [mounted, setMounted] = useState(false);
  const [localSelectedColor, setLocalSelectedColor] = useState<string>("");

  // === Set default color on mount and sync with store ===
  useEffect(() => {
    setMounted(true);
    if (colors.length > 0) {
      const defaultColor = colors[0];
      setLocalSelectedColor(defaultColor);
      setSelectedColor(defaultColor);
    }
  }, [colors, setSelectedColor]);

  if (!mounted) return null;

  const getColorValue = (colorName: string): string => {
    return colorMap[colorName] || "#9CA3AF"; // Default to gray if not found
  };

  const isLightColor = (colorName: string): boolean => {
    const lightColors = ["White", "Yellow", "Beige", "Silver"];
    return lightColors.includes(colorName);
  };

  const handleColorSelect = (color: string) => {
    setLocalSelectedColor(color);
    setSelectedColor(color);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-medium">
          Color:
        </span>
        <span className="text-sm font-semibold">
          {localSelectedColor || colors[0]}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isSelected = localSelectedColor === color;
          const colorValue = getColorValue(color);
          const needsBorder = isLightColor(color);

          return (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={`relative size-8 transition-all ${
                isSelected
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2"
              } ${needsBorder ? "border-2 border-gray-300" : ""}`}
              style={{ backgroundColor: colorValue }}
              title={color}
              aria-label={`Select ${color} color`}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check
                    className={`w-5 h-5 ${
                      isLightColor(color) ? "text-gray-800" : "text-white"
                    }`}
                    strokeWidth={3}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorVariants;
