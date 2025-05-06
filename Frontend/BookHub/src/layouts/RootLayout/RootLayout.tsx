import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <header>
        <h1>BookHub</h1>
        <nav>
          <a href="/">Home</a> | <a href="/shop">Shop</a> |{" "}
          <a href="/about">About</a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
