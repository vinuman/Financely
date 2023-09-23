import React from "react";
import { useState } from "react";
import validator from "validator";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = ({ signUp, setSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginWithEmail = () => {
    setLoading(true);
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      !validator.isEmail(email)
    ) {
      email.trim() === "" ? setEmailValid(false) : setEmailValid(true);
      password.trim() === "" ? setPasswordValid(false) : setPasswordValid(true);
      !validator.isEmail(email) ? setEmailValid(false) : setEmailValid(true);
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success("Login successfull");
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
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
            name: user.displayName,
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
          Log in on <span className=" text-blue-500">Financely.</span>
        </h1>

        <div className="flex flex-col my-2">
          <label className=" text-[16px] text-gray-600 px-2 opacity-90">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValid(true);
            }}
            className={`outline-none border-b ${
              !emailValid ? "border-red-600" : "border-gray-600"
            }  px-2`}
            type="text"
            placeholder="JohnDoe@gmail.com"
          ></input>
          {!emailValid && (
            <p className=" text-red-600 px-2">Enter your valid email ID</p>
          )}
        </div>
        <div className="flex flex-col my-2">
          <label className=" text-[16px] text-gray-600 px-2 opacity-90">
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValid(true);
            }}
            className={`outline-none border-b ${
              !passwordValid ? "border-red-600" : "border-gray-600"
            }  px-2`}
            type="password"
            placeholder="Example123"
          ></input>
          {!passwordValid && (
            <p className=" text-red-600 px-2">
              Please enter the correct password
            </p>
          )}
        </div>

        <button
          disabled={loading}
          onClick={loginWithEmail}
          className=" border h-[48px] border-blue-600 rounded-md text-blue-500 mt-4 hover:bg-blue-600 hover:text-white"
        >
          {loading ? "Loading..." : "Log in with email and password"}
        </button>
        <p className="mx-auto my-2">or</p>
        <button
          onClick={googleAuth}
          className="border h-[48px] bg-blue-600 rounded-md text-white mb-2 hover:bg-white hover:text-blue-600 hover:border-blue-600"
        >
          Sign Up/ Log in with Google
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
