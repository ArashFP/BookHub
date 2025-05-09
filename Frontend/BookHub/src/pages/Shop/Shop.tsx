import { useQuery } from "@apollo/client";
import Card from "../../components/Card/Card";
import CardGroup from "../../components/CardGroup/CardGroup";
import styles from "./Shop.module.css";
import { BOOKS_BY_AUTHOR_QUERY } from "../../graphql/queries/bookQueries";
import { Book } from "../../graphql/types/Book";

const Shop = () => {
  const { data, loading, error } = useQuery(BOOKS_BY_AUTHOR_QUERY, {
    variables: { author: "J.R.R. Tolkien" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className={styles.shopWrapper}>
      <CardGroup
        title="Store Favourites!"
        description="Our shopper have great taste, the epic fantasy trilogy by J.R.R. Tolkien is our most sold series of books"
      >
        {data.booksByAuthor.map((book: Book) => (
          <Card
            key={book.title}
            title={book.title}
            description={book.description}
            imageUrl={book.imageURL}
          />
        ))}
      </CardGroup>
    </main>
  );
};

export default Shop;
