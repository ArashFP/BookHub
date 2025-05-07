import styles from "./Text.module.css";

export const Text = ({ title, description }: TextProps) => {
  return (
    <div className={styles.textDiv}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

interface TextProps {
  title: string;
  description: string;
}
