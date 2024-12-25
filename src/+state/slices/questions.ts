import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"

import type { Questions } from "~/shared/types"
import {
	type AnsweredUnansweredQuestions,
	getAnsweredQuestionsAndUnansweredQuestions
} from "~/shared/utils"
import {
	addNewPoll,
	getInitQuestionsData,
	votePoll
} from "../actions/questions"
import type { RootState } from "../store"
import { type AsyncState, handleAsyncActions } from "../utils"

type QuestionsState = AsyncState<Questions>

const initialState: QuestionsState = {
	status: "idle",
	data: {},
	error: null
}

export const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		handleAsyncActions(builder, getInitQuestionsData)
		handleAsyncActions(builder, votePoll)
		handleAsyncActions(builder, addNewPoll)
	}
})

export const getQuestions = (state: RootState) => state.questions.data

export const getSortedQuestions = createSelector(
	(state: RootState) => state.questions.data,
	(questions) => {
		return Object.values(questions).sort((a, b) => b.timestamp - a.timestamp)
	}
)

export const getQuestionById = (questionId: string) =>
	createSelector(
		(state: RootState) => state.questions.data,
		(questions) => questions[questionId]
	)

export const getFilteredQuestions = createSelector(
	[
		(state: RootState) => state.users.data[state.auth.data?.id ?? "NO_USER"],
		(state: RootState) => state.questions.data
	],
	(loggedInUser, questions): AnsweredUnansweredQuestions => {
		if (!loggedInUser) {
			return { answered: [], unanswered: [] }
		}

		const filteredQuestions = getAnsweredQuestionsAndUnansweredQuestions(
			loggedInUser,
			Object.values(questions).sort((a, b) => b.timestamp - a.timestamp)
		)
		return filteredQuestions
	}
)

export const getActivitiesByUserId = (userId: string) =>
	createSelector(
		(state: RootState) => state.questions.data,
		(questions) => {
			if (!userId) return []
			return Object.values(questions)
				.filter(
					(question) =>
						question.author === userId ||
						question.optionOne.votes.includes(userId) ||
						question.optionTwo.votes.includes(userId)
				)
				.sort((a, b) => b.timestamp - a.timestamp)
		}
	)

export const questionsReducer = questionsSlice.reducer
