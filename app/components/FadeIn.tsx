// app/components/FadeIn.tsx
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export const FadeIn = ({ children, delay = 0, direction, className }: Props) => {
  // Calculamos el desplazamiento inicial
  const offset = 20; // Bajamos de 40 a 20 para que sea más sutil y no "salte"
  
  const initialX = direction === "left" ? offset : direction === "right" ? -offset : 0;
  const initialY = direction === "up" ? offset : direction === "down" ? -offset : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true }}
      // Usamos transition de tipo "tween" o un "spring" suave para evitar el rebote
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};