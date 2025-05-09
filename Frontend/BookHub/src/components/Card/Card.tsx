import React from "react";
import styles from "./Card.module.css";

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {imageUrl && (
        <img src={imageUrl} alt={title} className={styles.cardImage} />
      )}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {description && <p className={styles.cardDescription}>{description}</p>}
      </div>
    </div>
  );
};

export default Card;

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}
