import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSubjects} from "../redux/subjectsSlice/subjectsSlice";
import LoadingPage from "../components/LoadingPage";
import {useNavigate} from "react-router-dom";

const Main = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {loading, subjects} = useSelector((state) => state.subject)

	useEffect(() => {
		dispatch(getSubjects())
	}, [dispatch]);

	if (loading) return <LoadingPage />

	return (
		<div>
			main
		</div>
	);
};

export default Main;