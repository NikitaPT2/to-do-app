import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const Todo = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreated, setDateCreated] = useState(new Date().toLocaleString());
  const history = useHistory();

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { taskName, description, dateCreated }]);
    setTaskName("");
    setDescription("");
    setDateCreated("");
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <h3>Create app</h3>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date created"
          value={dateCreated}
          onChange={(e) => setDateCreated(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Todo;
