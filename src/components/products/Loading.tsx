"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex-1 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <ShoppingCart className="w-8 h-8 text-primary" />
        </div>
        {/* Loading text with animated dots */}
        <div className="flex items-center gap-2">
          <motion.p
            className="text-lg font-medium bg-linear-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-size-[200%_auto]"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Loading
          </motion.p>
          <div className="flex mt-1 gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="size-1.5 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
