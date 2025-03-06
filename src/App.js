import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AppRoutes from "../../front/src/Routes/Routes.jsx";

// components
import Navbar from "../../front/src/common/Navbar";
import Sidebar from "../../front/src/common/Sidebar";

import SignIn from "../../front/src/pages/Auth/SignIn";
import SignUp from "../../front/src/pages/Auth/SignUp";
import { getUserData } from "./auth/jwtService.js";

import { ToastContainer } from "react-toastify";
import {useSelector} from "react-redux";


function App() {
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {isSidebarOpen} = useSelector((state) => state.localStorage)
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(false);
    if (pathname === "/") {
      navigate("/main");
    }
  }, [navigate, pathname]);
  
  const checkRoute = () => {
    return !(pathname === "/sign-up" ||
      pathname === "/sign-in" ||
      pathname === "/verify" ||
      pathname === "/test" ||
      pathname === "/test-results" ||
      pathname === "/test-review" ||
      pathname === "/forgot" ||
      pathname === "/new-password" ||
      pathname.includes("explanation"));
  };
  
  useEffect(() => {
    if (!getUserData() &&
      pathname !== "/sign-up" &&
      pathname !== "/sign-in" &&
      pathname !== "/new-password" &&
      pathname !== "/verify" &&
      pathname !== "/forgot"
    ) {
      navigate("/sign-in");
    }
  }, [navigate, pathname]);
  
  if (isLoading) return "Loading..."
  
  return (
    <div>
      {checkRoute() ? (
        <>
          <Navbar/>
          <Sidebar/>
          <div
            className={`${
              isSidebarOpen ? 'sm:ml-0 lg:ml-56' : 'ml-0'
            } lg:px-8 pt-24 p-4 min-h-screen bg-[#f5f5f5]`}
          >
            <AppRoutes/>
          </div>
        </>
      ) : (
        <Routes>
          <Route path={"/sign-in"} element={<SignIn/>}/>
          <Route path={"/sign-up"} element={<SignUp/>}/>
        </Routes>
      )}
      
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        theme="colored"
        position="bottom-left"
      />
    </div>
  )
}

export default App
