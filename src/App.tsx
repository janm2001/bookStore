import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./pages/Books/Books";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact/Contact";
import GlobalStyles from "./styles/GlobalStyles";
import BookEdit from "./pages/Books/EditBook";
import AddBook from "./pages/Books/AddBook";
import Settings from "./pages/Settings/Settings";
import { ThemeContextProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/:id/edit" element={<BookEdit />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
