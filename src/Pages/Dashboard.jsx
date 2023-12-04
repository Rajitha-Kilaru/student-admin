import React from "react";
import "../styles/adminDashboard.css";
import HomeAdmin from "../Components/HomeAdmin/HomeAdmin";
import { useSelector } from "react-redux";
import HomeStudent from "../Components/Student/HomeStudent";

const Dashboard = () => {
  const user = useSelector((state) => state.user.data.user);
  console.log("9::", user);
  return (
    <>
      {
        user && user.role === "admin" && (
          <HomeAdmin />
        )
      }
      {
        user && user.role === "student" && (
          <HomeStudent />
        )
      }
       {/* <HomeAdmin /> */}
    </>
  );
};

export default Dashboard;
