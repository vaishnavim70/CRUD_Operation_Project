import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function PostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // Fetch existing tasks when the component mounts
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setTasks(data.slice(0, 10))) // Fetch the first 10 posts
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: isEditing ? editTaskId : tasks.length + 1, // Ensure 'id' is included
      title,
      body,
      userId: 1, // Example user ID
    };

    if (isEditing) {
      // Update task using PUT API
      fetch(`${API_URL}/${editTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update task");
          }
          return response.json();
        })
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editTaskId ? { ...task, ...newTask } : task
            )
          );
          setIsEditing(false);
          setEditTaskId(null);
          setTitle("");
          setBody("");
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      // Add task using POST API
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create task");
          }
          return response.json();
        })
        .then((createdTask) => {
          createdTask.id = tasks.length + 1; // Simulate new ID
          setTasks((prevTasks) => [...prevTasks, createdTask]);
          setTitle("");
          setBody("");
        })
        .catch((error) => console.error("Error creating task:", error));
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setBody(task.body);
    setEditTaskId(task.id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    // Delete task using DELETE API
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="post-container">
      <h1>{isEditing ? "Edit Task" : "Create a New Task"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">{isEditing ? "Update Task" : "Submit"}</button>
      </form>

      <div className="task-list">
        <h2>All Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong>: {task.body}
                <div className="actions">
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostPage;
