import styles from "./Shop.module.css";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { BookTable } from "../../components/Table/BookTable";
import { GET_ALL_BOOKS_QUERY } from "../../graphql/queries/bookQueries";
import { Book } from "../../graphql/types/Book";
import { BookModal } from "../../components/Modal/BookModal/BookModal";

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
      <h2 className={styles.shopTitle}>Library</h2>

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

      <BookModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        book={selectedBook}
      />
    </main>
  );
};

export default Shop;
