import { configureStore } from "@reduxjs/toolkit";

import localStorageSlice from "./LocalStorageSlice/LocalStorageSlice";
import SubjectsSlice from "./subjectsSlice/subjectsSlice";

export const store = configureStore({
	reducer: {
		subject: SubjectsSlice,
		localStorage: localStorageSlice,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});