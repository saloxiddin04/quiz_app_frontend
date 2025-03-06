import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "../pages/Main.jsx";
import {getUserData} from "../auth/jwtService";
import Subjects from "../pages/Subjects/Subjects";
import Tests from "../pages/Tests/Tests";
import CreateTest from "../pages/Tests/CreateTest";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/main"} element={<Main/>}/>
      <Route path={'/'} element={<Navigate to={"/main"}/>}/>

      {getUserData() && getUserData().role === "admin" && (
        <>
          <Route path="/create-subject" element={<Subjects/>} />
          <Route path="/tests" element={<Tests/>} />
          <Route path="/create-test/:id" element={<CreateTest/>} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;