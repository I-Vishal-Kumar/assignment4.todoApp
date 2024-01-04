import { Route, Routes } from "react-router-dom";
import Layout from "./components/LAYOUT/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import TodoEdit from "./components/TodoEdit/TodoEdit.jsx";
import Login from "./components/LAYOUT/Login.jsx";
import { UseGetTodoProvider } from "./hooks/useGetTodo";
import "./index.css";
function App() {
  return (
    <UseGetTodoProvider>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="editing" element={<TodoEdit />} />
        </Route>
      </Routes>
    </UseGetTodoProvider>
  );
}

export default App;
