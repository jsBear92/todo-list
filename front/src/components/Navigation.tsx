const NavBar: React.FC = () => {
    return (
        <nav className="flex w-32 justify-center bg-yellow-200">
            <ul>
                <li className="h-8">Todo</li>
                <li className="h-8">Calendar</li>
            </ul>
        </nav>
    );
}

export default NavBar;