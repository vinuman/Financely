import React from "react";

const Header = () => {
  const logoutfnc = () => {
    console.log("logged out");
  };
  return (
    <>
      <div className=" px-8 py-4 bg-blue-500 flex items-center justify-between sticky top-0">
        <p className=" text-white  font-bold text-[32px] tracking-wider">
          Financely.
        </p>
        <div>
          <p
            onClick={logoutfnc}
            className="text-white  font-bold text-[18px] cursor-pointer hover:opacity-70 tracking-wider"
          >
            logout
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
