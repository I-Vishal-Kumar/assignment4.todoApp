import { useState, useContext, createContext } from "react";
import { PropTypes } from "prop-types";

export const GetTodoContext = createContext(null);

export const UseGetTodoProvider = ({ children }) => {
  const [todos, updateTodos] = useState([]);

  let [todo_selected, update_selected_todo] = useState(0);

  function updateSelectedTodo(idx) {
    update_selected_todo(() => {
      return idx;
    });
  }
  return (
    <GetTodoContext.Provider
      value={{ todos, updateTodos, todo_selected, updateSelectedTodo }}
    >
      {children}
    </GetTodoContext.Provider>
  );
};

export const useGetTodoContext = () => {
  return useContext(GetTodoContext);
};

UseGetTodoProvider.propTypes = {
  children: PropTypes.node,
};
