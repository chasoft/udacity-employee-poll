import { createSlice } from "@reduxjs/toolkit"

import { doLogin } from "../actions/auth"
import type { RootState } from "../store"
import { type AsyncState, handleAsyncActions } from "../utils"

type Auth = {
	id: string
	name: string
	avatarURL: string
} | null

type AuthState = AsyncState<Auth>

const initialState: AuthState = {
	status: "idle",
	data: null,
	error: null
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			// localStorage.removeItem('userId');
			state.data = null
		}
	},
	extraReducers: (builder) => {
		handleAsyncActions(builder, doLogin)
	}
})

export const { logout: ACTION_LOGOUT } = authSlice.actions

export const getLoggedInSession = (state: RootState) => state.auth.data
export const getLoggedInUser = (state: RootState) =>
	state.users.data[state.auth.data?.id ?? "NO_LOGGED_IN_USER"]

export const authReducer = authSlice.reducer
