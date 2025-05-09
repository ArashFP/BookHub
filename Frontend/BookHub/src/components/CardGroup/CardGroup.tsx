import React from "react";
import styles from "./CardGroup.module.css";

interface CardGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode; // Accepts Card components or any other React nodes
}

export const CardGroup: React.FC<CardGroupProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <section className={styles.cardGroup}>
      {(title || description) && (
        <header className={styles.cardGroupHeader}>
          {title && <h2 className={styles.cardGroupTitle}>{title}</h2>}
          {description && (
            <p className={styles.cardGroupDescription}>{description}</p>
          )}
        </header>
      )}
      <div className={styles.cardGroupContent}>{children}</div>
    </section>
  );
};

export default CardGroup;
