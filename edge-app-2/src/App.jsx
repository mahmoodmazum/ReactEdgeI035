import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserLists";
import Counter from "./components/Counter";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Links */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/api-call">Api Call</Link>
        <Link to="/counter">Counter</Link>
      </nav>

      {/* Route Definitions */}
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/api-call" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
