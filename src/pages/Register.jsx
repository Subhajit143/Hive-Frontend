import React from "react";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

const Register = () => {
  const [pass, setPass] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleIcon = () => {
    setPass(!pass);
  };
  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user, // Retain all existing properties in user
      [name]: value, // Update the property matching 'name' with the new 'value'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("res from server :", res_data);
      if (response.ok) {
        storeTokenInLs(res_data.token);
        toast.success("Registration Successful");
        setUser({
          username: "",
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log("registration error: " + error);
    }
  };
  return (
    <>
      <main>
        <div>
          <div className=" grid justify-center">
            <h1 className="text-center text-4xl font-bold py-10">Sign In</h1>
            <form
              action=""
              onSubmit={handleSubmit}
              className=" container border bg-slate-50 drop-shadow-lg  rounded-lg w-auto p-10"
            >
              <div className="text-xl  ">
                <lable>Username</lable>
                <input
                  value={user.username}
                  onChange={handleInput}
                  type="username"
                  name="username"
                  placeholder="Enter your Name"
                  required
                  autoComplete="off"
                  className="w-full border shadow-lg border-slate-300 rounded-lg px-3 py-1"
                />
              </div>

              <div className="text-xl py-5 ">
                <lable>Email</lable>
                <input
                  value={user.email}
                  onChange={handleInput}
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  required
                  autoComplete="off"
                  className="w-full border shadow-lg border-slate-300 rounded-lg px-3 py-1"
                />
              </div>

              <div className="text-xl py-5">
                <lable>Password</lable>
                <div className="flex">
                  <input
                    value={user.password}
                    onChange={handleInput}
                    type={pass ? "password" : "text"}
                    name="password"
                    placeholder="Enter your Password"
                    required
                    autoComplete="off"
                    className="w-full shadow-xl border border-slate-300 rounded-lg px-3 py-1"
                  />

                  <div className="-ml-10 mt-2 cursor-pointer ">
                    {!pass ? (
                      <LuEye onClick={handleIcon} />
                    ) : (
                      <LuEyeClosed onClick={handleIcon} />
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center text-xl py-5">
                <button type="submit" className="bg-neutral-700 text-neutral-100 p-2 rounded-lg w-full">
                  Submit
                </button>
              </div>

              <p>Already Have an account?</p>
              <div>
                <a href="/login" className="text-neutral-400 hover:text-neutral-800 duration-300">
                  Login in your account
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
