import React from "react";

const SignIn = ({ signUp, setSignUp }) => {
  return (
    <>
      <div className=" p-8 bg-white flex flex-col justify-center  mt-8  w-[90%] lg:w-[40%]  max-w-[500px] mx-auto rounded-lg shadow-xl">
        <h1 className=" text-[24px] text-gray-700 tracking-wide mx-auto">
          Log in on <span className=" text-blue-500">Financely.</span>
        </h1>

        <div className="flex flex-col mt-2">
          <label className=" mb-2 text-[16px] text-gray-600 px-2 opacity-90">
            Email
          </label>
          <input
            className=" outline-none border-b border-gray-600 pb-2 px-2 mb-2"
            type="text"
            placeholder="JohnDoe@gmail.com"
          ></input>
        </div>
        <div className="flex flex-col mt-2">
          <label className=" mb-2 text-[16px] text-gray-600 px-2 opacity-90">
            Password
          </label>
          <input
            className=" outline-none border-b border-gray-600 pb-2 px-2 mb-2"
            type="password"
            placeholder="Example123"
          ></input>
        </div>

        <button className=" border h-[48px] border-blue-600 rounded-md text-blue-500 mt-4 hover:bg-blue-600 hover:text-white">
          Log in with email and password
        </button>
        <p className="mx-auto my-2">or</p>
        <button className="border h-[48px] bg-blue-600 rounded-md text-white mb-2 hover:bg-white hover:text-blue-600 hover:border-blue-600">
          Log in with Google
        </button>
        <p
          onClick={() => setSignUp(!signUp)}
          className="mx-auto text-gray-600 cursor-pointer hover:opacity-70"
        >
          Or Don't Have An Account? Click Here.
        </p>
      </div>
    </>
  );
};

export default SignIn;
