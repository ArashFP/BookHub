import {  useQuery } from "@apollo/client"
import { HELLO_QUERY } from "./graphql/queries";

//Todo figure out how to implement css modules
// Create a router for the app
// Create a layout for the app

function App() {
  const { loading, error, data } = useQuery(HELLO_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)

  return (
    <main>
      <h1>BookHub</h1>
      <p>Message from the server: {data.hello}</p>
    </main>
  )
}

export default App
