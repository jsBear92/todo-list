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
            if (Array.isArray(data)) {
                setTodos(data);
            } else {
                setTodos([]);
                console.log("Error: data is not an array");
            }
        })
        .catch((err) => {console.log(err.message)});
    }, []);

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, { id: Date.now(), title: inputValue, text:"", completed: false }]);
            setInputValue("");
        }
        console.log(todos);
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const changeTodo = (id: number, title: string, text: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, title: title, text: text } : todo
            )
        );
    }

    const removeTodo = (id: number) => {
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
                        { todoClickId === todo.id && todoDetail ? <TodoDetail title={todo.title} text={todo.text} /> : null }
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todos;