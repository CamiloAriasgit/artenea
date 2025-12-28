// app/components/FadeIn.tsx
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string; // Añade esta línea para corregir el error de los logs
}

export const FadeIn = ({ children, delay = 0, direction, className }: Props) => {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};