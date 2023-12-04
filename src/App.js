import "./App.css";
import { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Pages/Dashboard";
import Header from "./Pages/Header";
import Sidebar from "./Pages/Sidebar";
import { useSelector } from "react-redux";
import Students from "./Components/HomeAdmin/Students/Students";
import ChangePassword from "./Components/Login/ChangePassword";
import Announcements from "./Pages/Announcements";
import StudentResults from "./Components/Student/StudentResults";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state?.user?.data?.token || null
  );
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return isAuthenticated ? (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      {children}
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
  // return true ? (
  //   <div className="grid-container">
  //     <Header OpenSidebar={OpenSidebar} />
  //     <Sidebar
  //       openSidebarToggle={openSidebarToggle}
  //       OpenSidebar={OpenSidebar}
  //     />
  //     {children}
  //   </div>
  // ) : (
  //   <Navigate to="/login" replace />
  // );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
             <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        /> 
         <Route
          path="/student/:studentId"
          element={
            <ProtectedRoute>
              <StudentResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-results"
          element={
            <ProtectedRoute>
              <StudentResults />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
