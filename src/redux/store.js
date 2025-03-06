import { configureStore } from "@reduxjs/toolkit";

import localStorageSlice from "./LocalStorageSlice/LocalStorageSlice";

export const store = configureStore({
	reducer: {
		localStorage: localStorageSlice,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});