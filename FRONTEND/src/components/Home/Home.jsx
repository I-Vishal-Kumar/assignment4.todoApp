import TodoDisplay from "../TodoDisplay/TodoDisplay";
import TodoEdit from "../TodoEdit/TodoEdit";
const Home = () => {
  return (
    <div className="h-full w-full flex justify-between">
      <div className="md:border-r-2 h-full md:block hidden border-gray-300 border-solid flex-1">
        <TodoEdit />
      </div>
      <div className="flex-1 h-full">
        <TodoDisplay />
      </div>
    </div>
  );
};

export default Home;
