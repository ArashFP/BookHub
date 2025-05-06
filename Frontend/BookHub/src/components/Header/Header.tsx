import styles from "./Header.module.css";

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

interface HeaderProps {
  title: string;
}
