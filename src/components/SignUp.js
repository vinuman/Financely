import React from "react";
import { useState } from "react";
import validator from "validator";

const SignUp = ({ signUp, setSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const signUpWithEmail = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      !validator.isEmail(email) ||
      password !== confirmPassword
    ) {
      name.trim() === "" ? setNameValid(false) : setNameValid(true);
      email.trim() === "" ? setEmailValid(false) : setEmailValid(true);
      password.trim() === "" ? setPasswordValid(false) : setPasswordValid(true);
      confirmPassword.trim() === ""
        ? setConfirmPasswordValid(false)
        : setConfirmPassword(true);
      !validator.isEmail(email) ? setEmailValid(false) : setEmailValid(true);
      password !== confirmPassword
        ? setPasswordMatch(false)
        : setPasswordMatch(true);
    }

    /* createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      }); */
  };
  return (
    <>
      <div className=" p-8 bg-white flex flex-col justify-center  mt-8  w-[90%] lg:w-[40%]  max-w-[500px] mx-auto rounded-lg shadow-xl">
        <h1 className=" text-[24px] text-gray-700 tracking-wide mx-auto">
          Sign Up on <span className=" text-blue-500">Financely.</span>
        </h1>
        <div className="flex flex-col my-4">
          <label className=" mb-2  text-[16px] text-gray-600 px-2 opacity-90 ">
            Full Name
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
              setNameValid(true);
            }}
            className={`outline-none border-b border-gray-600   px-2 ${
              !nameValid ? "border-red-600" : "border-gray-600"
            }`}
            type="text"
            placeholder="John Doe"
            value={name}
          ></input>
          {!nameValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please enter your name
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2 my-4">
          <label className=" mb-2  text-[16px] text-gray-600 px-2 opacity-90">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValid(true);
            }}
            className={`outline-none border-b border-gray-600   px-2 ${
              !emailValid ? "border-red-600" : "border-gray-600"
            }`}
            type="text"
            placeholder="JohnDoe@gmail.com"
            value={email}
          ></input>
          {!emailValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please enter a valid email ID
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2 my-4">
          <label className=" mb-2  text-[16px] text-gray-600 px-2 opacity-90">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className={`outline-none border-b border-gray-600 px-2 ${
              !passwordValid ? "border-red-600" : "border-gray-600"
            }`}
            type="password"
            placeholder="Example123"
            value={password}
          ></input>
          {!passwordValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please enter a password
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2 my-4">
          <label className="text-[16px] text-gray-600 px-2 opacity-90">
            Confirm Password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`outline-none border-b border-gray-600 px-2 ${
              !confirmPasswordValid ? "border-red-600" : "border-gray-600"
            }`}
            type="password"
            placeholder="Example123"
            value={confirmPassword}
          ></input>
          {!confirmPasswordValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please re-enter the password
            </p>
          )}
          {!passwordMatch && (
            <p className=" text-red-600 text-[14px] px-2">
              The entered password does not match
            </p>
          )}
        </div>
        <button
          onClick={signUpWithEmail}
          className=" border h-[48px] border-blue-600 rounded-md text-blue-500 mt-4 hover:bg-blue-600 hover:text-white"
        >
          Sign Up with email and password
        </button>
        <p className="mx-auto my-2 ">or</p>
        <button className="border h-[48px] bg-blue-600 rounded-md text-white mb-2  hover:bg-white hover:text-blue-600 hover:border-blue-600">
          Sign Up with Google
        </button>
        <p
          onClick={() => setSignUp(!signUp)}
          className="mx-auto text-gray-600 cursor-pointer hover:opacity-70"
        >
          Or Have An Account Already? Click Here
        </p>
      </div>
    </>
  );
};

export default SignUp;
