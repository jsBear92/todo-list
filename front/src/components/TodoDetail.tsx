interface TodoDetailProps {
    title: string;
    text: string;
}

export const TodoDetail: React.FC<TodoDetailProps> = ({ title, text }) => {
    return (
        <div className="flex flex-col bg-red-400">
            <h1 className="flex justify-center" onClick={() => {}}>{title}</h1>
            <p className="flex justify-center">{text}</p>
        </div>
    );
}