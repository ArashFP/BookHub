import { useState } from "react";
import { useQuery } from "@apollo/client";
import { BookTable } from "../../components/Table/BookTable";
import { GET_ALL_BOOKS_QUERY } from "../../graphql/queries/bookQueries";
import { Book } from "../../graphql/types/Book";
import styles from "./Shop.module.css";
import { Modal } from "../../components/Modal/Modal";

const Shop = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: booksData, loading } = useQuery(GET_ALL_BOOKS_QUERY);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className={styles.shopWrapper}>
      <h2 className={styles.shopTitle}>Book Shop</h2>

      <section className={styles.resultsSection}>
        {loading ? (
          <div className={styles.loadingMessage}>Loading books...</div>
        ) : (
          <BookTable
            books={booksData?.books || []}
            onSelectBook={handleSelectBook}
          />
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedBook?.title || "Book Details"}
      >
        {selectedBook && (
          <div className={styles.bookDetailsModal}>
            <p className={styles.bookDetailRow}>
              <span className={styles.bookDetailLabel}>Author: </span>
              <span className={styles.bookDetailValue}>
                {selectedBook.author}
              </span>
            </p>
            {selectedBook.description && (
              <p className={styles.bookDetailRow}>
                <span className={styles.bookDetailLabel}>Description: </span>
                <span className={styles.bookDetailValue}>
                  {selectedBook.description}
                </span>
              </p>
            )}
            {selectedBook.publishedYear && (
              <p className={styles.bookDetailRow}>
                <span className={styles.bookDetailLabel}>Published: </span>
                <span className={styles.bookDetailValue}>
                  {selectedBook.publishedYear}
                </span>
              </p>
            )}
            {selectedBook.price && (
              <p className={styles.bookDetailRow}>
                <span className={styles.bookDetailLabel}>Price: </span>
                <span className={styles.bookDetailValue}>
                  ${selectedBook.price}
                </span>
              </p>
            )}
            {selectedBook.genre && Array.isArray(selectedBook.genre) && (
              <p className={styles.bookDetailRow}>
                <span className={styles.bookDetailLabel}>Genre: </span>
                <span className={styles.bookDetailValue}>
                  {selectedBook.genre.join(", ")}
                </span>
              </p>
            )}
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Shop;
