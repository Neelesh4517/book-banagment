import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-light shadow-sm mb-3">
      <div className="container py-3 d-flex justify-content-between align-items-center">
        <h1 className="h4 mb-0">Books Dashboard</h1>
        <nav className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-primary">Home</Link>
          <Link to="/add" className="btn btn-primary">Add Book</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
