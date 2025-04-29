import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const appTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { title, description }]);
    setTitle("");
    setDescription("");
  };

  const deleteTodo = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
    setToastMessage("Task deleted successfully!");
    setShowToast(true);
  };

  const editTodo = (index) => {
    const updated = prompt("Enter Updated Title");
    const updatedDesc = prompt("Enter Updated Description");
    if (updated && updatedDesc) {
      todos[index].title = updated;
      todos[index].description = updatedDesc;
      setTodos([...todos]);
      setToastMessage("Task updated successfully!");
      setShowToast(true);
    } else if (updated || updatedDesc) {
      alert("Both fields must be filled!");
    }
  };

  return (
    <>
      <div>
        <h1>Todo App</h1>
        <form onSubmit={appTodo}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
            required
            value={title}
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            required
            type="text"
            placeholder="Task Description"
            value={description}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className={`toast ${showToast ? "active" : ""}`}>{toastMessage}</div>
    </>
  );
}

export default App;
