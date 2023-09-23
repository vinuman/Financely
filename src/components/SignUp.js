import React from "react";
import { useState } from "react";
import validator from "validator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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
  const [passwordLength, setPasswordLength] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signUpWithEmail = async () => {
    setLoading(true);
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword === "" ||
      !validator.isEmail(email) ||
      password !== confirmPassword ||
      password.length < 6
    ) {
      name.trim() === "" ? setNameValid(false) : setNameValid(true);
      email.trim() === "" ? setEmailValid(false) : setEmailValid(true);
      password.trim() === "" ? setPasswordValid(false) : setPasswordValid(true);
      confirmPassword === ""
        ? setConfirmPasswordValid(false)
        : setConfirmPassword(true);
      !validator.isEmail(email) ? setEmailValid(false) : setEmailValid(true);
      password !== confirmPassword
        ? setPasswordMatch(false)
        : setPasswordMatch(true);
      password.length < 6 ? setPasswordLength(false) : setPasswordLength(true);
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User created");
          setLoading(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          // ...
          //Create a document with user ID as the following
          createDoc(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        });
    }
    async function createDoc(user) {
      setLoading(true);
      //Make sure that the doc with the uid does not exist
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);

      //create a new doc
      if (!userData.exists()) {
        try {
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName ? user.displayName : name,
            email: user.email,
            photoUrl: user.photoURL ? user.photoURL : "",
            createdAt: new Date(),
          });
          toast.success("User profile created");
          setLoading(false);
        } catch (err) {
          toast.error(err.message);
          setLoading(false);
        }
      } else {
        toast.error("Doc already exists");
        setLoading(false);
      }
    }
  };

  //Google auth
  function googleAuth() {
    async function createDoc(user) {
      setLoading(true);
      //Make sure that the doc with the uid does not exist
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);

      //create a new doc
      if (!userData.exists()) {
        try {
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName ? user.displayName : name,
            email: user.email,
            photoUrl: user.photoURL ? user.photoURL : "",
            createdAt: new Date(),
          });
          toast.success("User profile created");
          setLoading(false);
        } catch (err) {
          toast.error(err.message);
          setLoading(false);
        }
      } else {
        /* toast.error("Doc already exists"); */
        setLoading(false);
      }
    }
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          createDoc(user);

          // IdP data available using getAdditionalUserInfo(result)
          // ...
          setLoading(false);
          toast.success("User sign up successfull");
          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } catch (err) {
      toast.error(err.message);
    }
  }

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
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValid(true);
              setPasswordLength(true);
            }}
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
          {!passwordLength && (
            <p className=" text-red-600 text-[14px] px-2">
              The password length must be greater than 5
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2 my-4">
          <label className="text-[16px] text-gray-600 px-2 opacity-90">
            Confirm Password
          </label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordValid(true);
              setPasswordMatch(true);
            }}
            className={`outline-none border-b border-gray-600 px-2 ${
              !confirmPasswordValid ? "border-red-600" : "border-gray-600"
            }`}
            type="password"
            placeholder="Example123"
            value={confirmPassword}
          ></input>
          {!confirmPasswordValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please confirm the password
            </p>
          )}
          {!passwordMatch && confirmPasswordValid && (
            <p className=" text-red-600 text-[14px] px-2">
              The entered password does not match
            </p>
          )}
        </div>
        <button
          disabled={loading}
          onClick={signUpWithEmail}
          className=" border h-[48px] border-blue-600 rounded-md text-blue-500 mt-4 hover:bg-blue-600 hover:text-white"
        >
          {loading ? "Loading...." : "Sign Up with Email and Password"}
        </button>
        <p className="mx-auto my-2 ">or</p>
        <button
          onClick={googleAuth}
          className="border h-[48px] bg-blue-600 rounded-md text-white mb-2  hover:bg-white hover:text-blue-600 hover:border-blue-600"
        >
          Sign Up/ Log in with Google
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
