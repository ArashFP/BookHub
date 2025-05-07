import { Text } from "../../components/Text/Text";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <Text
        title="Welcome"
        description="BookHub is your ultimate destination for discovering, exploring, and purchasing books. Whether you're a fan of fiction, non-fiction, or academic literature, BookHub offers a curated collection to suit every reader's taste. Enjoy a seamless shopping experience with personalized recommendations, detailed book descriptions, and secure checkout. Start your reading journey with BookHub today!"
      />
    </div>
  );
};

export default Home;
