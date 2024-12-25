import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"

import type { Users } from "~/shared/types"
import { getInitUsersData } from "../actions/users"
import type { RootState } from "../store"
import { type AsyncState, handleAsyncActions } from "../utils"

type UsersState = AsyncState<Users>

const initialState: UsersState = {
	status: "idle",
	data: {},
	error: null
}

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		handleAsyncActions(builder, getInitUsersData)
	}
})

export const getLoadingStatus = createSelector(
	[
		(state: RootState) => state.questions.status,
		(state: RootState) => state.users.status
	],
	(questionsStatus, usersStatus) => {
		return questionsStatus === "loading" || usersStatus === "loading"
	}
)

export const getUsers = (state: RootState) => state.users.data

export const getUserById = (userId: string) =>
	createSelector(
		(state: RootState) => state.users.data,
		(usersData) => usersData[userId]
	)

export const getLeaderboard = createSelector(
	(state: RootState) => state.questions.data,
	(questions) => {
		const counter: Record<string, { created: number; answered: number }> = {}

		for (const question of Object.values(questions)) {
			if (!counter[question.author]) {
				counter[question.author] = { created: 0, answered: 0 }
			}

			counter[question.author].created += 1

			for (const userId of question.optionOne.votes.concat(
				question.optionTwo.votes
			)) {
				if (!counter[userId]) {
					counter[userId] = { created: 0, answered: 0 }
				}
				counter[userId].answered += 1
			}
		}

		return counter
	}
)

export const usersReducer = usersSlice.reducer
