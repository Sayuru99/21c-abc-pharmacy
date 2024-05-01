import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8880/api/v1/login",
        {
          email: email,
          password: password,
        }
      );
      
      const token = response.data.token;
      
      localStorage.setItem("token", token);
      
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };  

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <h2 className="font-bold text-3xl mb-4">Sign In</h2>
          <p className="text-lg text-blue-gray font-normal">
            Enter your email and password to Sign In.
          </p>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
          <div className="mb-1 flex flex-col gap-6">
            <label htmlFor="email" className="text-blue-gray font-medium">Your email</label>
            <input
              id="email"
              type="email"
              size="lg"
              placeholder="name@mail.com"
              className="px-4 py-2 border border-blue-gray-200 focus:border-gray-900 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="text-blue-gray font-medium">Password</label>
            <input
              id="password"
              type="password"
              size="lg"
              placeholder="********"
              className="px-4 py-2 border border-blue-gray-200 focus:border-gray-900 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg w-full" type="submit">
            Sign In
          </button>
          <div className="flex items-center justify-between gap-2 mt-6">
            <input type="checkbox" style={{ display: "none" }} />
            <p className="text-gray-900 font-medium">
              <Link to="/">Forgot Password</Link>
            </p>
          </div>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" alt="Background pattern" />
      </div>
    </section>
  );
}

export default SignIn;
