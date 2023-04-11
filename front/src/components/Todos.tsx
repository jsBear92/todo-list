import { useEffect, useState } from "react";
import { TodoDetail } from "./TodoDetail";

type Todo = {
    id: number;
    title: string;
    text: string;
    completed: boolean;
}

const Todos: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [todoClickId, setTodoClickId] = useState<number | null>(null);
    const [todoDetail, setTodoDetail] = useState<boolean>(false);

    useEffect(() => {
    fetch("http://localhost:5000/api/todos")
        .then(res => res.json())
        .then(data => {
            setTodos(data.data.todos);
        })
        .catch((err) => {console.log(err.message)});
    }, []);

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo = { id: Date.now(), title: inputValue, text:"", completed: false };
            fetch('http://localhost:5000/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newTodo)
            });
            setTodos([...todos, newTodo]);
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

    const updateTodo = (id: number, title: string, text: string) => {
        changeTodo(id, title, text);

        fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ title: title, text: text })
        })
        .then(res => res.json())
        .catch(err => console.log('Error: ', err.message));
    }

    const changeTodo = (id: number, title: string, text: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, title: title, text: text } : todo
            )
        );
    }

    const removeTodo = (id: number) => {
        fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        })
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleTodoClick = (id: number) => {
        setTodoClickId(id);
        setTodoDetail(!todoDetail);
    };

    return (
        <div className="flex flex-col grow bg-blue-200">
            <div className="flex flex-row relative top-3 justify-around">
                <input
                    type="text"
                    className="min-w-[80%] h-8 rounded-md"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a new task"
                />
                <button
                    className="w-20 rounded-md bg-blue-400 hover:bg-blue-600"
                    onClick={addTodo}
                >Add</button>
            </div>
            <ul className="relative top-8 bg-red-50">
                {todos.map((todo) => (
                    <li
                        className="flex flex-col"
                        key={todo.id}
                    >
                        <div className="flex flex-row h-8 justify-around items-center">
                            <input
                                type="checkbox"
                                className=""
                                onChange={() => toggleTodo(todo.id)}
                                checked={todo.completed}
                            />
                            <span className="min-w-[80%]" onClick={() => handleTodoClick(todo.id)}>{todo.title}</span>
                            <button
                                className="w-20 relative right-3.5 rounded-md bg-red-400 hover:bg-red-600"
                                onClick={() => removeTodo(todo.id)}
                            >Delete</button>
                        </div>
                        { todoClickId === todo.id && todoDetail ? <TodoDetail todo={todo} onUpdate={updateTodo} /> : null }
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todos;