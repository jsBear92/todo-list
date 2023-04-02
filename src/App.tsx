import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Todo List</h1>
        <input
          className="flex w-full py-2 border border-blue-400 rounded-full focus:border-blue-600 focus:outline-none"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new task"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={addTodo}
        >Add</button>
        <ul className="mt-4 space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center space-x-2"
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            >
              <input type="checkbox" onChange={() => toggleTodo(todo.id)} checked={todo.completed} />
              <span className="flex grow">{todo.text}</span>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                onClick={() => removeTodo(todo.id)}
              >Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
