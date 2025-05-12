import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variantBodyColor = "default",
}) => {
  if (!isOpen) return null;

  const bodyClassName = `${styles.modalBody} ${
    styles[`modalBody${variantBodyColor}`] || ""
  }`;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <Button onClick={onClose} variant="close" type="button">
            x
          </Button>
        </div>
        <div className={bodyClassName}>{children}</div>
      </div>
    </div>
  );
};
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variantBodyColor?: "default" | "grayBodyContent";
}
