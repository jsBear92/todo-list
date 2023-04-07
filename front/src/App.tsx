import Todos from "./components/Todos";
import NavBar from "./components/Navigation";
import Find from "./components/Find";

const App: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-200">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-xl font-bold h-10 bg-pink-200">Todo List</h1>
        <Find />
      </div>
      <div className="flex flex-row h-screen justify-between bg-green-200">
        <NavBar />
        <Todos />
      </div>
    </div>
  );
}

export default App;
