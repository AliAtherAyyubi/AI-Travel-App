import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "bg-glass-bg/40 backdrop-blur-md border border-glass-border rounded-2xl p-6 shadow-glass",
        hover && "hover:bg-glass-bg/60 hover:border-primary/30 transition-all duration-300",
        className
      )}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
