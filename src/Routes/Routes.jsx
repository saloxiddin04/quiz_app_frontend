import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "../pages/Main.jsx";
import {getUserData} from "../auth/jwtService";
import Subjects from "../pages/Subjects/Subjects";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/main"} element={<Main/>}/>
      <Route path={'/'} element={<Navigate to={"/main"}/>}/>

      {getUserData() && getUserData().role === "admin" && (
        <>
          <Route path="/create-subject" element={<Subjects/>} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;