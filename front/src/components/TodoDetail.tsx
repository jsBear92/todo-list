import { useState } from "react";

interface Todo {
    todo: {
        id: string;
        title: string;
        text: string;
        completed: boolean;
    };
    onUpdate: (id: string, title: string, text: string) => void;
}

export const TodoDetail: React.FC<Todo> = ({ todo, onUpdate }) => {
    const [todoTitle, setTodoTitle] = useState<string>(todo.title);
    const [todoText, setTodoText] = useState<string>(todo.text);

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.target.value);
    }

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    }

    return (
        <div className="flex flex-col">
            <div className="relative mb-3 xl:w-96 bg-violet-200">
                <input
                    type="text"
                    className="min-h-[auto] w-full bg-transparent px-3 py-[0.25rem] outline-none"
                    value={todoTitle}
                    onChange={handleTitle}
                    onBlur={() => onUpdate(todo.id, todoTitle, todoText)}
                />
            </div>
            <div className="relative mb-3 xl:w-96 bg-violet-200">
                <input
                    type="text"
                    className="min-h-[auto] w-full bg-transparent px-3 py-[0.25rem] outline-none"
                    placeholder="Enter a contents"
                    value={todoText}
                    onChange={handleText}
                    onBlur={() => onUpdate(todo.id, todoTitle, todoText)}
                />
            </div>
        </div>
    );
}