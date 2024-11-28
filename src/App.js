import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ListPage from "./ListPage";
import DetailPage from "./DetailPage";
import PostPage from "./PostPage";

function App() {
  return (
    <Router>
      <div>
        <h1>List Information App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/post">Create Post</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/details/:id" element={<DetailPage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
