// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import BookForm from './pages/booksform';
import Header from './pages/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBookForm from './pages/editbookForm';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<BookForm />} />
        <Route path="/edit/:id" element={<EditBookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
