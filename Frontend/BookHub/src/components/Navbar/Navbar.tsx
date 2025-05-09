import { useState } from "react";
import styles from "./Navbar.module.css";
import { isTokenExpired } from "../../utils/tokenUtils";
import { Modal } from "../Modal/Modal";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { UserSettings } from "../UserSettings/UserSettings";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const isSignedIn = token && !isTokenExpired(token);

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalIsopen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbarContainer}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
        >
          Home
        </NavLink>{" "}
        |{" "}
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
        >
          Shop
        </NavLink>{" "}
        |{" "}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
        >
          About
        </NavLink>
      </nav>
      <div className={styles.authButtonsContainer}>
        {!isSignedIn ? (
          <>
            <Button onClick={() => setRegisterModalOpen(true)}>Register</Button>
            <Button onClick={() => setSignInModalOpen(true)}>Sign In</Button>
          </>
        ) : (
          <>
            <Button onClick={handleLogout}>Log Out</Button>
            <Button onClick={() => setSettingsModalIsopen(true)}>
              <FontAwesomeIcon icon={faGear} />
            </Button>
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
        <SignIn onClose={() => setSignInModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setSettingsModalIsopen(false)}
        title="Settings"
      >
        <UserSettings />
      </Modal>
    </div>
  );
};
