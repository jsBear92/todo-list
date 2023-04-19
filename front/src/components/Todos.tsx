import { useEffect, useState } from "react";
import { TodoDetail } from "./TodoDetail";

type Todo = {
    id: string;
    title: string;
    text: string;
    completed: boolean;
}

const Todos: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [todoClickId, setTodoClickId] = useState<string | null>(null);
    const [todoDetail, setTodoDetail] = useState<boolean>(false);

    useEffect(() => {
    fetch("https://4kundsudle.execute-api.ap-southeast-2.amazonaws.com/prod/todos", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res =>  {
            const resClone = res.clone();
            resClone.text().then(text => console.log('Raw response:', text));
            return res.json();
          })
        .then(data => {
            setTodos(data.Items);
        })
        .catch((err) => {console.log(err.message)});
    }, []);

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo = { id: Date.now().toString(), title: inputValue, text:"", completed: false };
            fetch('https://4kundsudle.execute-api.ap-southeast-2.amazonaws.com/prod/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ Item: newTodo })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        console.log('Error details:', error);
                        throw new Error('Error posting todo: ' + error.message);
                    });
                }
            })
            .catch(err => console.log('Error: ', err.message));
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    };

    const toggleTodo = (id: string) => {

        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const updateTodo = (id: string, title: string, text: string) => {
        changeTodo(id, title, text);

        fetch(`https://4kundsudle.execute-api.ap-southeast-2.amazonaws.com/prod/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ Item: { title: title, text: text } })
        })
        .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        console.log('Error details:', error);
                        throw new Error('Error posting todo: ' + error.message);
                    });
                }
            })
        .catch(err => console.log('Error: ', err.message));
    }

    const changeTodo = (id: string, title: string, text: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, title: title, text: text } : todo
            )
        );
    }

    const removeTodo = (id: string) => {
        fetch(`https://4kundsudle.execute-api.ap-southeast-2.amazonaws.com/prod/todos/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        })
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleTodoClick = (id: string) => {
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