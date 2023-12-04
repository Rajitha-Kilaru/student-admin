import React from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { CgPassword } from "react-icons/cg";
import logoImage from "../Components/Assets/logo-college.jpg";
import { FaSchool } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/user";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.data?.user);
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaSchool />
          {/* <img src={logoImage} alt="" className="my-image" width={120} /> */}
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <Link to="/">
          <li className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </Link>
        {user && user.role === "student" && (
          <Link to="/student-results">
            <li className="sidebar-list-item">
              <TbReport className="icon" /> Results
            </li>
          </Link>
        )}
        <Link to="/change-password">
          <li className="sidebar-list-item">
            <CgPassword className="icon" /> Change password
          </li>
        </Link>
        {user && (
          <Link
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            <li className="sidebar-list-item">
              {" "}
              <BiLogOutCircle className="icon" /> Logout
            </li>
          </Link>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
