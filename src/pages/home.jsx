import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./loader";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(true);
  const limit = 10;

useEffect(() => {
  setLoading(true)
  axios.get("http://localhost:9006/books")
    .then((res) => setBooks(res.data))
    
    .catch(err => console.error(err));
    setLoading(false)
}, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios.delete(`http://localhost:9006/books/${id}`)
        .then(() => {
          setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
          alert("Book deleted successfully!");
        })
        .catch(err => {
          console.error("Failed to delete book:", err);
          alert("Failed to delete the book.");
        });
    }
  };

  const genres = [...new Set(books?.map(b => b.genre))];
  const filtered = books?.filter(b => {
    return (
      (query === "" ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())) &&
      (genreFilter === "All" || b.genre === genreFilter) &&
      (statusFilter === "All" || b.status === statusFilter)
    );
  });
  const totalPages = Math.ceil(filtered?.length / limit);
  const pageItems = filtered?.slice((page - 1) * limit, page * limit);

  return (
    
    <div className="container py-4">
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="form-select"
          >
            <option>All</option>
            {genres.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
          >
            <option>All</option>
            <option>Available</option>
            <option>Issued</option>
          </select>
        </div>
      </div>
{loading ? (
        <Loader /> // Show loader when loading is true
      ) : (
        <>
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems?.length > 0 ? (
            pageItems.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.genre}</td>
                <td>{b.publishedYear}</td>
                <td>
                  <span
                    className={`badge ${
                      b.status === "Available"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="text-end">
                  <Link
                    to={`/edit/${b.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>Page {page} of {totalPages}</span>
        <div>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="btn btn-outline-secondary btn-sm me-2"
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="btn btn-outline-secondary btn-sm"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
</>
      )}

    </div>
  );
}

export default Dashboard;
