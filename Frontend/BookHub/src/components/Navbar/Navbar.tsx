import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div>
        <nav className={styles.navbar}>
          <a href="/">Home</a> | <a href="/shop">Shop</a> |{" "}
          <a href="/about">About</a>
        </nav>
      </div>
    </div>
  );
};
