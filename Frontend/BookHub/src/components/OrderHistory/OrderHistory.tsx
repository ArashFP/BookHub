import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { USER_ORDERS_QUERY } from "../../graphql/queries/orderQueries";
import { GET_ALL_BOOKS_QUERY } from "../../graphql/queries/bookQueries";
import Button from "../Button/Button";
import styles from "./OrderHistory.module.css";
import { Book } from "../../graphql/types/Book";
import { Order } from "../../graphql/types/Order";

export const OrderHistory: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useQuery(USER_ORDERS_QUERY, {
    variables: { userId },
    skip: !userId,
  });

  const { data: booksData, loading: booksLoading } =
    useQuery(GET_ALL_BOOKS_QUERY);

  if (!userId) {
    return (
      <div className={styles.message}>
        Please log in to view your order history.
      </div>
    );
  }

  if (ordersLoading || booksLoading) {
    return <div className={styles.message}>Loading your orders...</div>;
  }

  if (ordersError) {
    return (
      <div className={styles.error}>
        Error loading orders: {ordersError.message}
      </div>
    );
  }

  const orders = ordersData?.userOrders || [];
  const allBooks = booksData?.books || [];

  if (orders.length === 0) {
    return (
      <div className={styles.message}>You haven't placed any orders yet.</div>
    );
  }

  const getOrderBooks = (bookIds: string[]) => {
    return allBooks.filter(
      (book: Book) => book.id && bookIds.includes(book.id)
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className={styles.orderHistoryContainer}>
      <h3 className={styles.sectionTitle}>Your Orders</h3>

      <div className={styles.ordersList}>
        {orders.map((order: Order) => (
          <div
            key={order.id}
            className={`${styles.orderItem} ${
              selectedOrderId === order.id ? styles.selectedOrder : ""
            }`}
          >
            <div className={styles.orderSummary}>
              <div className={styles.orderInfo}>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(order.orderDate)}
                </p>
                <p>
                  <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
                </p>
              </div>
              <Button
                variant={selectedOrderId === order.id ? "primary" : "secondary"}
                onClick={() =>
                  setSelectedOrderId(
                    selectedOrderId === order.id ? null : order.id
                  )
                }
              >
                {selectedOrderId === order.id ? "Hide Details" : "View Details"}
              </Button>
            </div>

            {selectedOrderId === order.id && (
              <div className={styles.orderDetails}>
                <h4 className={styles.orderDetailsTitle}>Order Contents</h4>
                <ul className={styles.booksList}>
                  {getOrderBooks(order.books).map((book: Book) => (
                    <li key={book.id} className={styles.bookItem}>
                      <div className={styles.bookInfo}>
                        <p className={styles.bookTitle}>{book.title}</p>
                        <p className={styles.bookAuthor}>by {book.author}</p>
                        {book.price && (
                          <p className={styles.bookPrice}>
                            ${book.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
