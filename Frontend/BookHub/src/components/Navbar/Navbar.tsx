import { useState } from "react";
import styles from "./Navbar.module.css";
import { isTokenExpired } from "../../utils/tokenUtils";
import { Modal } from "../Modal/Modal";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const isSignedIn = token && !isTokenExpired(token);

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.navbarContainer}>
      <div>
        <nav className={styles.navbar}>
          <a href="/">Home</a> | <a href="/shop">Shop</a> |{" "}
          <a href="/about">About</a>
        </nav>
      </div>
      <div className={styles.authButtons}>
        {!isSignedIn ? (
          <>
            <button onClick={() => setRegisterModalOpen(true)}>Register</button>
            <button onClick={() => setSignInModalOpen(true)}>Sign In</button>
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Log Out</button>
          </>
        )}
      </div>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        title="Register"
      >
        <SignUp />
      </Modal>

      <Modal
        isOpen={isSignInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        title="Sign In"
      >
        <SignIn />
      </Modal>
    </div>
  );
};
