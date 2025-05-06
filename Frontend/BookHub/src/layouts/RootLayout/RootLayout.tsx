import styles from "./RootLayout.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";

function RootLayout() {
  return (
    <div className={styles.rootDiv}>
      <Navbar />
      <Header title="BookHub" />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
