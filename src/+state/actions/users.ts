import { createAsyncThunk } from "@reduxjs/toolkit"

import { _getUsers } from "../_DATA"

export const getInitUsersData = createAsyncThunk(
	"users/get-init-data",
	async () => {
		const users = await _getUsers()
		return users
	}
)
