import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center";
  
  const variants = {
    // Orange Theme (Start Quiz)
    primary: "bg-primary hover:bg-primary-dark text-white shadow-orange-500/20",
    // Blue Theme (Practice)
    secondary: "bg-secondary hover:bg-secondary-dark text-white shadow-blue-500/20",
    // Feedback
    danger: "bg-incorrect text-white shadow-red-500/30",
    success: "bg-correct text-white shadow-green-500/30",
    // Cards / Options
    outline: "bg-white border-2 border-transparent hover:border-primary/20 text-dark-text shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-gray-500 hover:text-dark-text shadow-none"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};