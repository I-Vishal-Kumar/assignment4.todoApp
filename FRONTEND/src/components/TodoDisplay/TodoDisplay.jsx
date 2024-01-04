import { useEffect, useState } from "react";
import search_img from "../../assets/search.png";
import TodoCard from "../TodoCard/TodoCard";
import { useGetTodoContext } from "../../hooks/useGetTodo";
import { useNavigate } from "react-router-dom";
const TodoDisplay = () => {
  const [isSingle_todo, update_todo] = useState(false);
  const { todos, updateTodos, update_selected_todo } = useGetTodoContext();
  const [single_todo, updateSingleTodo] = useState(null);
  const [search_id, updateSearchId] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    async function getTodos() {
      try {
        let config = {
          method: "GET",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            Authorization: window.localStorage.getItem("access_token"),
          },
        };
        let res = await fetch(
          `${process.env.REACT_APP_BASE_URL}retrive_notes`,
          config
        );
        res = await res.json();
        if (res?.status === "ok") {
          updateTodos(res?.data || {});
        } else if (res?.status === "err") {
          alert(res?.message || "something went wrong");
        } else {
          alert(res?.message || "something went wrong");
          navigate("/login");
        }
      } catch (error) {
        alert("something went wrong login again");
        // navigate("/login");
        return;
      }
    }
    getTodos();
  }, [updateTodos]);

  function search() {
    let data = todos.filter((item) => Number(item.id) === Number(search_id));
    updateSingleTodo(data[0]);
  }

  return (
    <section className="px-[1rem] py-[0.5rem] h-full overflow-auto">
      <div className="w-full flex justify-center">
        <div
          style={{
            boxShadow:
              "0px 4px 4px 0px rgba(0, 0, 0, 0.25) , 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
          }}
          onClick={() => update_todo((prev) => !prev)}
          className="bg-[#D9D9D9] cursor-pointer mb-[0.5rem] flex justify-between items-center relative w-[14rem] h-[3rem] md:h-[2.5rem] rounded-full px-[1rem]"
        >
          <label
            style={{
              transition: "all .5s ease-in-out",
            }}
            htmlFor="l_phoneNumber"
            className={
              (isSingle_todo ? " translate-x-[100%]" : "") +
              " font-semibold flex cursor-pointer justify-center items-center top-0 left-0 h-[100%] text-center w-[7rem] bg-[#90C2FC] text-textColor rounded-full text-[1.4] py-1 absolute"
            }
          >
            <p>{isSingle_todo ? "SINGLE TODO" : "All TODO'S"}</p>
          </label>
          <p className="font-semibold">ALL TODO&apos;S</p>
          <p className="font-semibold">Single Todo</p>
        </div>
      </div>
      {/* todo card */}
      {!isSingle_todo && (
        <div className="my-[1rem] mt-[2.5rem]">
          {todos?.map((item, idx) => (
            <TodoCard
              key={item?.id || idx}
              data={item}
              update_selected_todo={update_selected_todo}
            />
          ))}
        </div>
      )}

      {isSingle_todo && (
        <div className="my-[1rem] mt-[2.5rem] h-full">
          <div
            style={{ boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)" }}
            className="flex h-[3rem] w-full rounded-[0.3rem] capitalize overflow-hidden bg-[#BCCAEF]"
          >
            <input
              type="text"
              onChange={(e) => updateSearchId(e.target.value)}
              placeholder="Search #ID"
              value={search_id}
              className="flex-[3] text-[1.2rem] outline-none pl-[1rem] bg-transparent"
            />
            <div
              onClick={search}
              className="flex-[1] flex items-center bg-[#e5e2e3] justify-center"
            >
              <h2 className="font-semibold text-[1.2rem] px-[0.25rem]">
                Search
              </h2>
              <span className="h-full w-[2rem] flex flex-[1] justify-center items-center">
                <img src={search_img} className="h-[70%]" alt="" />
              </span>
            </div>
          </div>

          {/* card */}
          <div className="mt-[3rem]">
            {single_todo && <TodoCard data={single_todo} />}
          </div>
        </div>
      )}
    </section>
  );
};

export default TodoDisplay;
