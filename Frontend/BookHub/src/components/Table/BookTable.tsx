import React, { useEffect, useState } from "react";
import styles from "./BookTable.module.css";
import { Book } from "../../graphql/types/Book";
import Button from "../Button/Button";
import { isTokenExpired } from "../../utils/tokenUtils";
import { useCart } from "../../context/CartContext";

export const BookTable: React.FC<BookTableProps> = ({
  books,
  onSelectBook,
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsUserLoggedIn(token !== null && !isTokenExpired(token));
    };

    checkLoginStatus();

    const intervalId = setInterval(checkLoginStatus, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBookId(book.id || null);
    if (onSelectBook) {
      onSelectBook(book);
    }
  };

  const handleAddToCart = (book: Book, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch({ type: "ADD_ITEM", payload: book });
  };

  if (books.length === 0) {
    return <div className={styles.noResults}>No books found</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Genre</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr
            key={book.id}
            className={`${styles.bookRow} ${
              selectedBookId === book.id ? styles.selectedRow : ""
            }`}
          >
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publishedYear || "-"}</td>
            <td>
              {Array.isArray(book.genre)
                ? book.genre.join(", ")
                : book.genre || "-"}
            </td>
            <td>${book.price || "N/A"}</td>
            <td className={styles.actionButtons}>
              <Button
                variant="secondary"
                onClick={(e) => {
                  if (e) {
                    e.stopPropagation();
                  }
                  handleBookClick(book);
                }}
              >
                View
              </Button>
              <Button
                variant="secondary"
                disabled={!isUserLoggedIn}
                onClick={(e) => handleAddToCart(book, e)}
              >
                {isUserLoggedIn ? "Add to cart" : "Login to Order"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface BookTableProps {
  books: Book[];
  onSelectBook?: (book: Book) => void;
}
