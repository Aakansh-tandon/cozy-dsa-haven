
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  initialLikes: number;
  onLike?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();

    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <button 
      onClick={handleClick}
      className="relative flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors group"
    >
      <div className="relative">
        <Heart 
          className={cn(
            "h-4 w-4 transition-colors duration-300",
            isLiked && "fill-red-500 text-red-500"
          )} 
        />
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 2, 1],
                opacity: [1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 text-red-500"
            >
              <Heart className="h-4 w-4 fill-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="group-hover:text-primary transition-colors">{likes}</span>
    </button>
  );
};

export default LikeButton;
