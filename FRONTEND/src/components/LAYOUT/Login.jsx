import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/LOGO.png";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, updateLogin] = useState(true);
  const [l_details, update_l_details] = useState({
    user_name: "",
  });
  const [r_details, update_r_details] = useState({
    user_name: "",
  });

  function update_register_details(e) {
    update_r_details({ user_name: e.target.value });
  }

  function update_login_details(e) {
    update_l_details({ user_name: e.target.value });
  }

  async function LOGIN(e) {
    e.preventDefault();
    try {
      let config = {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(l_details),
      };
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}login`,
        config
      );
      response = await response.json();

      if (response?.status === "ok") {
        console.log(response.access_token);
        window.localStorage.setItem("access_token", response.access_token);
        navigate("/home");
      }
      alert(response?.message);
    } catch (error) {
      alert(error?.message || "something went wrong");
    }
  }
  async function SIGNUP(e) {
    e.preventDefault();
    try {
      let config = {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(r_details),
      };
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}signup`,
        config
      );
      response = await response.json();
      if (response?.status === "ok") {
        console.log(response.access_token);
        window.localStorage.setItem("access_token", response.access_token);
        navigate("/home");
      }
      alert(response?.message || "something went wrong");
    } catch (error) {
      alert(error?.response?.data?.message || "something went wrong");
    }
  }

  return (
    <>
      <div className=" h-[100vh] justify-center items-center w-[100vw] bg-backgroundColor flex">
        <div className="flex h-[95vh] relative overflow-hidden w-[95vw] rounded-[1.4rem]">
          <div className=" md:flex hidden justify-center items-center bg-forgroundColor h-full w-[60%] rounded-bl-[1rem] rounded-tl-[1rem]  ">
            <div className="h-[80%] w-[80%] mt-[10rem] flex flex-col items-center">
              <div
                style={{
                  background: `url(${LOGO}) center no-repeat`,
                  backgroundSize: "contain",
                }}
                className="h-[30%] z-10 aspect-square bg-indigo-400  rounded-full"
              ></div>
              <h2 className="text-blue-800 mt-4 font-bold text-lg">
                VISAHL KUMAR
              </h2>
              <span className="mt-[5rem] flex font-semibold">
                HELLO THERE THE NAME IS VISHAL AN I AM READY TO
                <h3 className="pl-1 text-blue-800"> JOIN</h3>
              </span>
            </div>
          </div>
          <div className="md:w-[40%] w-full h-full bg-forgroundColor rounded-full flex justify-center items-center">
            {/* login section */}
            {isLogin && (
              <section
                className="h-[100%]  md:rounded-tl-none
           overflow-hidden md:rounded-bl-none rounded-[1rem]  p-5 py-16 w-[100%] bg-forgroundColor flex flex-col items-center "
              >
                <div
                  style={{
                    background: `url(${LOGO}) center no-repeat`,
                    backgroundSize: "contain",
                  }}
                  className="h-[25%] z-10 aspect-square bg-indigo-400  rounded-full"
                ></div>
                <form
                  onSubmit={LOGIN}
                  className=" [&>*]:flex z-10 [&>*]:py-4 w-full p-4"
                >
                  <div className="flex-col">
                    <label
                      htmlFor="l_phoneNumber"
                      className="font-bold capitalize text-xl py-1"
                    >
                      user ID
                    </label>
                    <input
                      autoFocus
                      tabIndex={1}
                      required={true}
                      value={l_details.user_name}
                      onChange={update_login_details}
                      placeholder="Enter user ID"
                      className="border-[1px] invalid:border-[1.5px] invalid:border-red-500 rounded-md py-2 pl-4 text-xl border-solid font-bold
                outline-none border-black bg-transparent"
                      type="text"
                    />
                  </div>
                  <div className="flex-col w-full items-center mt-4">
                    <button
                      type="submit"
                      tabIndex={2}
                      value={"LOGIN"}
                      className="w-[40%] bg-[#3486eb] rounded-md py-4 text-center font-bold text-xl text-white"
                    >
                      LOGIN
                    </button>
                  </div>
                  <div className="flex-row text-xl w-full font-bold">
                    <span>Create an account</span>
                    <span
                      onClick={() => {
                        updateLogin((prev) => !prev);
                      }}
                      className="px-1 text-red-500 cursor-pointer"
                    >
                      here
                    </span>
                  </div>
                </form>
              </section>
            )}
            {/* signup section */}
            {isLogin || (
              <section
                className="h-[100%] md:rounded-tl-none
           overflow-y-auto pb-10 md:rounded-bl-none rounded-[1rem]  p-5 py-16 w-[100%] bg-forgroundColor flex flex-col items-center "
              >
                <div
                  style={{
                    background: `url(${LOGO}) center no-repeat`,
                    backgroundSize: "contain",
                  }}
                  className="h-[25%] z-10 aspect-square bg-indigo-400  rounded-full"
                ></div>
                <form
                  onSubmit={SIGNUP}
                  className=" [&>*]:flex z-10 [&>*]:py-3 w-full p-4"
                >
                  <div className="flex-col">
                    <div className=" flex-1 gap-x-[0.5rem]">
                      <label
                        htmlFor="l_phoneNumber"
                        className="font-bold capitalize text-xl py-1"
                      >
                        user ID
                      </label>
                      <input
                        autoFocus
                        tabIndex={1}
                        required={true}
                        onChange={update_register_details}
                        placeholder={"Enter user id"}
                        className="border-[1px] invalid:border-red-400 invalid:border-[1.5px] w-[100%] rounded-md py-2 pl-4 text-xl border-solid font-bold
                outline-none border-black bg-transparent"
                        type="text"
                        value={r_details.user_name}
                      />
                    </div>
                  </div>

                  <div className="flex-col w-full items-center mt-4">
                    <button
                      tabIndex={2}
                      type="submit"
                      value={"SIGN UP"}
                      className="w-[40%] bg-[#3486eb] text-white rounded-md py-4 text-center font-bold text-xl text-textColor"
                    >
                      SIGNUP
                    </button>
                  </div>
                  <div className="flex-row text-xl w-full font-bold">
                    <span>Have an account</span>
                    <span
                      onClick={() => {
                        updateLogin((prev) => !prev);
                      }}
                      className="px-1 text-red-500 cursor-pointer"
                    >
                      login here
                    </span>
                  </div>
                </form>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
