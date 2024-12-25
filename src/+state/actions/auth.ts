import { createAsyncThunk } from "@reduxjs/toolkit"

import { _getUsers } from "../_DATA"

export type LoginPayload = { username: string; password: string } | null

export const doLogin = createAsyncThunk<
	{ id: string; name: string; avatarURL: string } | null,
	LoginPayload
>("auth/do-login", async (loginPayload: LoginPayload, { rejectWithValue }) => {
	if (!loginPayload) {
		return rejectWithValue(null)
	}

	const users = await _getUsers()
	/**
	 * Please note that this is fake authentication
	 * We assumpt that `password` is the same as `userId`
	 */
	const user = users[loginPayload.username]

	if (user && loginPayload.username === loginPayload.password) {
		return {
			id: user.id,
			name: user.name,
			avatarURL: user.avatarURL
		}
	}

	return rejectWithValue("Username or Password not matched!")
})
