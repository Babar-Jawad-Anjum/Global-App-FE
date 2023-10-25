import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const handleSubmitForm = (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      axios
        .post("http://localhost:3001/auth/login", data)
        .then(function (response) {
          if (response.data.error) {
            alert(response.data.error);
          } else if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("CCode", response.data.CCode);
            localStorage.setItem("UserId", response.data.UserId);
            localStorage.setItem("UserName", response.data.Username);
            navigate("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <section class="login__container bg-gray-300">
      <div class="flex items-center justify-center px-6 h-[100vh]">
        <div class="w-full bg-white rounded-lg shadow-lg sm:max-w-md">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="Username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5"
                  placeholder="sample@gmail.com"
                  {...register("Username", {
                    required: true,
                  })}
                />
                {errors?.Username?.type === "required" && (
                  <p className="text-xs text-red-500 mt-1 ml-2 font-semibold">
                    Name is required
                  </p>
                )}
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="Password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register("Password", {
                    required: true,
                  })}
                />
                {errors?.Password?.type === "required" && (
                  <p className="text-xs text-red-500 mt-1 ml-2 font-semibold">
                    Password is required
                  </p>
                )}
              </div>

              <button
                type="submit"
                class="w-full text-white bg-[#5766BF] hover:bg-[#697be6] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
