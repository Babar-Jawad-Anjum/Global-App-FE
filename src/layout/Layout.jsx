import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="mx-8 sm:mx-28 md:mx-44 lg:mx-56 my-24 bg-gray-100 border text-black shadow-lg rounded-lg p-10 pb-28 md:pb-44">
      {children}
    </div>
  );
};

export default Layout;
