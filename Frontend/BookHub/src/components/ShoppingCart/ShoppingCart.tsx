import React from "react";
import { useCart } from "../../context/CartContext";
import Button from "../Button/Button";
import styles from "./ShoppingCart.module.css";
import { useMutation } from "@apollo/client";
import { isTokenExpired } from "../../utils/tokenUtils";
import { CREATE_ORDER_MUTATION } from "../../graphql/mutations/orderMutations";

export const ShoppingCart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [createOrder, { loading }] = useMutation(CREATE_ORDER_MUTATION);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity },
    });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || isTokenExpired(token) || !userId) {
      alert("You need to be logged in to place an order.");
      return;
    }

    try {
      const bookIds = state.items.map((item) => item.book.id);

      // Create order only if there are items in the cart
      if (bookIds.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      await createOrder({
        variables: {
          userId,
          books: bookIds,
          totalPrice: state.total,
        },
      });

      alert("Order placed successfully!");
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className={styles.shoppingCartContainer}>
      {state.items.length === 0 ? (
        <p className={styles.emptyCartMessage}>Your cart is empty</p>
      ) : (
        <>
          <div className={styles.cartItemsList}>
            {state.items.map((item) => (
              <div key={item.book.id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <h3>{item.book.title}</h3>
                  <p>Author: {item.book.author}</p>
                  <p>Price: ${item.book.price?.toFixed(2) || 0}</p>
                </div>
                <div className={styles.itemControls}>
                  <div className={styles.quantityControl}>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.book.id || "",
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </Button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.book.id || "",
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => handleRemoveItem(item.book.id || "")}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <p className={styles.cartTotal}>Total: ${state.total.toFixed(2)}</p>
            <Button
              variant="primary"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
