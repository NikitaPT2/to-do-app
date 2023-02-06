import React, { useState, useEffect } from "react";
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

const HomePage = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [selectedTodo, setSelectedTodo] = useState({
    todo: {
      taskName: "",
      description: "",
      dateCreated: "",
    },
    index: -1,
  });
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setEditing(true);
    setSelectedTodo({
      todo: todos[index],
      index,
    });
  };

  const saveTodo = () => {
    const newTodos = [...todos];
    if (editing) {
      newTodos[selectedTodo.index] = selectedTodo.todo;
      setTodos(newTodos);
      setEditing(false);
    } else {
      newTodos.push(selectedTodo.todo);
      setTodos(newTodos);
    }
    setSelectedTodo({
      todo: {
        taskName: "",
        description: "",
        dateCreated: "",
      },
      index: -1,
    });
  };

  const handleSearch = () => {
    setErrorMessage("");
    const results = todos.filter((todo) =>
      todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (results.length === 0) {
      setErrorMessage("No results found");
    } else {
      setSearchResults(results);
    }
  };

  return (
    <div>
      <h3>Todo List</h3>
      <label>
        Search:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </label>
      {errorMessage && <p>{errorMessage}</p>}
      {editing ? (
        <form className="todo-form">
          <label>
            Task Name:
            <input
              type="text"
              value={selectedTodo.todo.taskName}
              onChange={(e) =>
                setSelectedTodo({
                  todo: { ...selectedTodo.todo, taskName: e.target.value },
                  index: selectedTodo.index,
                })
              }
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={selectedTodo.todo.description}
              onChange={(e) =>
                setSelectedTodo({
                  todo: { ...selectedTodo.todo, description: e.target.value },
                  index: selectedTodo.index,
                })
              }
            />
          </label>
          <label>
            Date Created:
            <input
              type="text"
              value={selectedTodo.todo.dateCreated}
              onChange={(e) =>
                setSelectedTodo({
                  todo: { ...selectedTodo.todo, dateCreated: e.target.value },
                  index: selectedTodo.index,
                })
              }
            />
          </label>
          <button onClick={saveTodo}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length > 0
              ? searchResults.map((todo, index) => (
                  <tr key={index}>
                    <td>{todo.taskName}</td>
                    <td>{todo.description}</td>
                    <td>{todo.dateCreated}</td>
                    <td>
                      <button onClick={() => editTodo(index)}>Edit</button>
                      <button onClick={() => removeTodo(index)}>Remove</button>
                    </td>
                  </tr>
                ))
              : todos.map((todo, index) => (
                  <tr key={index}>
                    <td>{todo.taskName}</td>
                    <td>{todo.description}</td>
                    <td>{todo.dateCreated}</td>
                    <td>
                      <button onClick={() => editTodo(index)}>Edit</button>
                      <button onClick={() => removeTodo(index)}>Remove</button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
function App() {
  return <HomePage />;
}

export default App;
