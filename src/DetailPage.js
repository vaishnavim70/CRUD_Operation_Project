import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css"; // Import the CSS file

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function DetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="detail-container">
      {item ? (
        <>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </>
      ) : (
        <p>Item not found.</p>
      )}
    </div>
  );
}

export default DetailPage;
