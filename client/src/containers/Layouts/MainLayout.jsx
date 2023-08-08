import React from "react";
import { Outlet } from "react-router-dom";

const mainLayout = ({ children }) => {
  return (
    <div className="grid">
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default mainLayout;
