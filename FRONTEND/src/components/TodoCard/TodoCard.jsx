import { useState, useEffect } from "react";
import close_img from "../../assets/close.png";
import open_img from "../../assets/open.png";
import create_img from "../../assets/create.png";
import delete_img from "../../assets/delete.png";
import { PropTypes } from "prop-types";
import { useGetTodoContext } from "../../hooks/useGetTodo";
import { useNavigate } from "react-router-dom";

const TodoCard = ({ data }) => {
  let { updateSelectedTodo, updateTodos } = useGetTodoContext();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  let navigate = useNavigate();

  function update(idx) {
    updateSelectedTodo(idx);
    if (windowSize.width < 700) {
      navigate("/editing");
    }
  }

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
      alert(error?.message || "something went wrong login again");
      navigate("/login");
      return;
    }
  }

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getFormatedDate(date) {
    date = new Date(date);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  const [is_todo_opened, update_opended_todo] = useState(false);

  async function delete_todo(id) {
    let config = {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        Authorization: window.localStorage.getItem("access_token"),
      },
      body: JSON.stringify({ id: id }),
    };
    let res = await fetch(
      `${process.env.REACT_APP_BASE_URL}delete_note`,
      config
    );
    res = await res.json();
    if (res?.status === "ok") {
      alert("deleted");
      getTodos();
    } else {
      alert(res?.message || "something went wrong");
      navigate("/login");
    }
  }

  return !data ? (
    ""
  ) : (
    <div className="my-[0.5rem] pb-[3rem] h-full">
      <div className="rounded-[0.25rem] bg-white">
        <div className="flex justify-between items-center bg-[#ffff]">
          <div className="px-[0.75rem] rounded-t-md bg-[#E3E5E2]">
            <h2 className="font-semibold line-clamp-1 text-[1.1rem]">
              {data?.heading || "Heading things are best thing ever"}
            </h2>
          </div>
          <span className="flex bg-[#ffff] text-end justify-end pr-[0.3rem]">
            {/* 0 Jan 2024 00:00 PM */}
            {data?.updated_at
              ? getFormatedDate(data?.updated_at)
              : "0 Jan 2024 00:00 PM "}
          </span>
        </div>
        <div style={{ gridTemplateRows: "1fr auto" }} className="grid">
          <div className="w-full py-[0.12rem] bg-[#e5e3e2] flex justify-between px-[0.5rem]">
            <div>
              <h2 className="font-bold">#{data?.id || "no id"}</h2>
            </div>
            <div className="flex items-center gap-x-[1rem]">
              <h2 className="text-[0.8rem]">Done</h2>
              <span className="h-[1.12rem] aspect-square rounded-full bg-green-400"></span>
            </div>
          </div>
          <div className="flex items-start ">
            <div
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
              className="flex-[2] rounded-b-[0.3rem] h-full bg-[#e5e3e2] overflow-hidden"
            >
              <p
                className={
                  (is_todo_opened ? "" : "line-clamp-2 ") +
                  " overflow-hidden pl-[0.75rem] bg-[#e3e5e2] pr-[0.5rem]"
                }
              >
                {data?.content || "no contnet"}
              </p>
              {is_todo_opened && (
                <div className="h-[2rem] bg-[#e5e3e2] flex justify-end">
                  <div className="grid">
                    <div
                      style={{
                        boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
                      }}
                      className="h-full"
                    >
                      <div
                        onClick={() => update_opended_todo(false)}
                        style={{
                          background: `url(${close_img}) center no-repeat`,
                          backgroundSize: "50%",
                        }}
                        className="flex justify-center items-center h-full w-[4rem]"
                      >
                        {/* <img src={close_img} className="h-[2rem] " alt="" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                boxShadow:
                  " 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset , 0 4px 4px 0 rgba(0,0,0,0.25)",
              }}
              className="flex-[1] grid grid-cols-3 bg-[#e5e3e2] h-3rem"
            >
              <div
                onClick={() => update_opended_todo(true)}
                style={{
                  background: `url(${open_img}) center no-repeat`,
                  backgroundSize: "60%",
                }}
                className="flex justify-center  items-center h-[3rem]"
              >
                {/* <img src={open_img} className="h-[65%]" alt="" /> */}
              </div>
              <div
                onClick={() => update(data?.id || 0)}
                style={{
                  background: `url(${create_img}) center no-repeat`,
                  backgroundSize: "60%",
                }}
                className="border-l-[1.25px] border-r-[1.25px] flex justify-center items-center border-solid border-gray-400 h-[3rem]"
              >
                {/* <img src={create_img} className="h-[65%]" alt="" /> */}
              </div>
              <div
                onClick={() => delete_todo(data?.id)}
                style={{
                  background: `url(${delete_img}) center no-repeat`,
                  backgroundSize: "60%",
                }}
                className="flex h-[3rem] justify-center items-center"
              >
                {/* <img src={delete_img} className="h-[75%]" alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TodoCard.propTypes = {
  data: PropTypes.object,
  update_selected_todo: PropTypes.func,
};

export default TodoCard;
