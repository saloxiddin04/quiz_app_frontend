import { configureStore } from "@reduxjs/toolkit";

import localStorageSlice from "./LocalStorageSlice/LocalStorageSlice";
import SubjectsSlice from "./subjectsSlice/subjectsSlice";
import testSlice from "./testSlice/testSlice";

export const store = configureStore({
	reducer: {
		subject: SubjectsSlice,
		test: testSlice,
		localStorage: localStorageSlice,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});