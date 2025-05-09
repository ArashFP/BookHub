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
      className={`${styles.button} ${styles[variant]}`}
      type={type} // Pass the type prop to the button
      disabled={disabled} // Pass the disabled prop to the button
    >
      {children}
    </button>
  );
};

export default Button;

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
