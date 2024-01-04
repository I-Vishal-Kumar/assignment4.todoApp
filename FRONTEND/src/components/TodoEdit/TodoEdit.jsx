import { useEffect, useState } from "react";
import edit from "../../assets/edit.png";
import { useGetTodoContext } from "../../hooks/useGetTodo";
import { useNavigate } from "react-router-dom";
const TodoEdit = () => {
  const { todos, todo_selected, updateTodos, updateSelectedTodo } =
    useGetTodoContext();
  const [text_area_words, setTextAreaCount] = useState(0);
  let navigate = useNavigate();
  const [heading_words, setHeadingCount] = useState(0);
  const [data, update_data] = useState({
    heading: "",
    content: "",
    id: 0,
    updated_at: "",
  });

  function getWordCount(txt) {
    const words = txt.split(/\s+/);
    const currentWordCount = words.filter((word) => word !== "").length;
    return currentWordCount;
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

  async function saveTodo() {
    let config = {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        Authorization: window.localStorage.getItem("access_token"),
      },
      body: JSON.stringify(data),
    };
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}create_note`,
        config
      );
      res = await res.json();
      if (res?.status === "ok") {
        alert("created");
        setDefault();
        getTodos();
      } else if (res?.status === "err") {
        alert(res?.message || "something went wrong");
      } else {
        alert("something went wrong");
        navigate("/login");
      }
    } catch (error) {
      alert(error?.message || "login again");
      navigate("/login");
    }
  }

  function setDefault() {
    update_data({
      heading: "",
      content: "",
      id: 0,
      updated_at: "",
    });
    updateSelectedTodo(0);
    setHeadingCount(0);
    setTextAreaCount(0);
  }

  useEffect(() => {
    if (todo_selected !== 0) {
      let data = todos.filter((item) => {
        return item.id === todo_selected;
      });
      data = data[0];
      update_data((prev) => {
        return {
          ...prev,
          heading: data.heading,
          content: data.content,
          id: data.id,
          updated_at: getFormatedDate(data.updated_at),
        };
      });
      setTextAreaCount(() => {
        return getWordCount(data?.content || "");
      });
      setHeadingCount(() => {
        return getWordCount(data?.heading || "");
      });
    }
  }, [todo_selected]);

  function getFormatedDate(date) {
    date = new Date();
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

  const handleTextAreaChange = (event) => {
    const inputValue = event.target.value;
    const words = inputValue.split(/\s+/);
    const currentWordCount = words.filter((word) => word !== "").length;

    if (currentWordCount <= 200) {
      update_data((prev) => {
        return { ...prev, [event.target.id]: inputValue };
      });
      setTextAreaCount(currentWordCount);
    }
  };
  const handleHeadingChange = (event) => {
    const inputValue = event.target.value;
    const words = inputValue.split(/\s+/);
    const currentWordCount = words.filter((word) => word !== "").length;

    if (currentWordCount <= 4) {
      update_data((prev) => {
        return { ...prev, [event.target.id]: inputValue };
      });
      setHeadingCount(currentWordCount);
    }
  };

  return (
    <section className="px-[1rem]">
      <h2 className="text-md pt-[1rem] text-center text-[1.2rem] font-semibold">
        Create Todo
      </h2>
      <div className="py-[2rem]">
        <h2 className="ml-[0.5rem] py-[0.25rem] text-[1.25rem] font-semibold">
          Heading : -
        </h2>
        <div
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          className="flex h-[3rem] items-center bg-[#EAF2FC] rounded-[0.3rem] overflow-hidden"
        >
          <span className="px-[0.25rem]">
            <img src={edit} alt="" />
          </span>
          <input
            type="text"
            onChange={handleHeadingChange}
            id="heading"
            value={data.heading || ""}
            className="bg-transparent  outline-none pl-[0.5rem] text-[1.25rem] flex-1"
            placeholder="Enter a heading"
          />
          <div className="px-[1rem] bg-[#D9D9D9] h-full flex items-center text-[1.12rem]">
            <span
              className={
                heading_words === 4 ? "text-red-600 font-bold flex " : "flex"
              }
            >
              <h2>{heading_words}</h2>/ <h2>4</h2>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="ml-[0.5rem] py-[0.25rem] text-[1.25rem] font-semibold">
            To - Do : -
          </h2>
          <span className="flex text-gray-700">
            <h2>Edited at :- </h2>
            {data.updated_at || "not found"}
          </span>
        </div>
        <div
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          className="relative rounded-[0.3rem]"
        >
          <textarea
            id="content"
            cols="30"
            rows="10"
            onChange={handleTextAreaChange}
            value={data.content || ""}
            className="w-full bg-[#EAF2FC] h-[17rem] pb-[2.6rem] rounded-[0.3rem] outline-none p-[0.5rem]"
          ></textarea>
          <div className="px-[1rem] rounded-b-[0.3rem] absolute bottom-0 w-full h-[2.6rem] bg-[#D9D9D9] flex items-center justify-end text-[1.12rem]">
            <span
              className={
                text_area_words === 200 ? "text-red-500 flex font-bold" : "flex"
              }
            >
              <h2>{text_area_words}</h2>/ <h2>200</h2>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-[2rem] flex justify-between">
        <div
          onClick={() => setDefault()}
          className="w-[40%] cursor-pointer rounded-[0.18rem] flex justify-center items-center h-[3rem] font-bold bg-[#FCD4A5]"
        >
          CANCEL
        </div>
        <div
          onClick={saveTodo}
          className="w-[40%] cursor-pointer bg-[#B5F7C3] rounded-[0.18rem] flex justify-center items-center h-[3rem] font-bold"
        >
          SAVE
        </div>
      </div>
    </section>
  );
};

export default TodoEdit;
