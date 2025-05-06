import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// const { loading, error, data } = useQuery(HELLO_QUERY);
// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error.message}</p>;
