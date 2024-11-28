import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css"; // Import the CSS file

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function ListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const limitedData = data.slice(0, 10);
        setItems(limitedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="list-container">
      <h1>List of Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/details/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;
