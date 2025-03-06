import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "../pages/Main.jsx";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={"/main"} element={<Main />} />
			<Route path={'/'} element={<Navigate to={"/main"} />} />
		</Routes>
	);
};

export default AppRoutes;