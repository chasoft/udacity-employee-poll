import { configureStore } from "@reduxjs/toolkit"

import { authReducer } from "./slices/auth"
import { questionsReducer } from "./slices/questions"
import { usersReducer } from "./slices/users"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		questions: questionsReducer,
		users: usersReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
