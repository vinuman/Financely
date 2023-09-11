import React from "react";
import Header from "../components/Header";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { useState } from "react";

const Home = () => {
  const [signUp, setSignUp] = useState(true);
  return (
    <>
      <Header />
      {signUp && <SignUp signUp={signUp} setSignUp={setSignUp} />}
      {!signUp && <SignIn signUp={signUp} setSignUp={setSignUp} />}
    </>
  );
};

export default Home;
