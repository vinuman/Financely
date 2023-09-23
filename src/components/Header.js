import React, { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUpPage = location.pathname === "/";

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  const logoutfnc = () => {
    try {
      signOut(auth).then(() => {
        toast.success("logged out succesfully");
        navigate("/");
      });
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className=" px-8 py-4 bg-blue-500 flex items-center justify-between sticky top-0">
        <p className=" text-white  font-bold text-[32px] tracking-wider">
          Financely.
        </p>
        <div>
          {!isSignUpPage && (
            <p
              onClick={logoutfnc}
              className="text-white  font-bold text-[18px] cursor-pointer hover:opacity-70 tracking-wider"
            >
              logout
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
