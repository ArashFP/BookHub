import React from "react";
import styles from "./BookModal.module.css";
import { Book } from "../../../graphql/types/Book";
import { Modal } from "../Modal";

export const BookModal: React.FC<BookModalProps> = ({
  isOpen,
  onClose,
  book,
}) => {
  if (!book) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={book.title || "Book Details"}
      variantBodyColor="grayBodyContent"
    >
      <div className={styles.bookDetails}>
        <p className={styles.detailRow}>
          <span className={styles.label}>Author:</span> {book.author}
        </p>

        {book.description && (
          <p className={styles.detailRow}>
            <span className={styles.label}>Description:</span>{" "}
            {book.description}
          </p>
        )}

        {book.publishedYear && (
          <p className={styles.detailRow}>
            <span className={styles.label}>Published:</span>{" "}
            {book.publishedYear}
          </p>
        )}

        {book.price && (
          <p className={styles.detailRow}>
            <span className={styles.label}>Price:</span> $
            {book.price.toFixed(2)}
          </p>
        )}

        {book.genre && Array.isArray(book.genre) && (
          <p className={styles.detailRow}>
            <span className={styles.label}>Genre:</span> {book.genre.join(", ")}
          </p>
        )}
      </div>
    </Modal>
  );
};

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}
