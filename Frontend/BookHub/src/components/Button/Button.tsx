import React from "react";
import styles from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={` ${styles.button} ${styles[variant]}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

interface ButtonProps {
  onClick?: (event?: React.MouseEvent) => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "close";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
