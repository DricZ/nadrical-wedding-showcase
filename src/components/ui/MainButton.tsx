import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface MainButtonProps {
  children?: ReactNode;
  icon?: ReactNode;
  text?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  to?: string;
  href?: string;
  external?: boolean;
}

export const MainButton: FC<MainButtonProps> = ({
  children,
  icon,
  text,
  onClick,
  className = "",
  variant = "primary",
  fullWidth = false,
  to,
  href,
  external = false,
}) => {
  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center gap-2 
    font-jakarta-medium text-sm rounded-full transition-all duration-300
    group px-6 py-3
  `;

  const widthClass = fullWidth ? "w-full" : "w-fit";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
      "border-2 border-primary/20 bg-transparent text-primary hover:border-primary/50",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {text && <span>{text}</span>}
        {children}
        {icon && (
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            {icon}
          </span>
        )}
      </span>
      {/* Optional subtle hover effect overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );

  const finalClassName = `${baseClasses} ${variants[variant]} ${widthClass} ${className}`;

  if (to) {
    return (
      <Link to={to} className={finalClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={finalClassName}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={finalClassName}
    >
      {content}
    </motion.button>
  );
};
