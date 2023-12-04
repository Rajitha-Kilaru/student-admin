import React from "react";
import { BsJustify } from "react-icons/bs";
import NotificationDropDown from "../Components/Student/NotificationDropDown";
import { useSelector } from "react-redux";

function Header({ OpenSidebar }) {
  const user = useSelector((state) => state.user.data.user);
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        {user?.role === "student" && <NotificationDropDown />}
      </div>
      
    </header>
  );
}

export default Header;
