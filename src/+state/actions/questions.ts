import { createAsyncThunk } from "@reduxjs/toolkit"

import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../_DATA"
import { store } from "../store"
import { getInitUsersData } from "./users"

export const getInitQuestionsData = createAsyncThunk(
	"questions/get-init-data",
	async () => {
		const questions = await _getQuestions()
		return questions
	}
)

type NewPollPayload = {
	optionOneText: string
	optionTwoText: string
	author: string
}

export const addNewPoll = createAsyncThunk(
	"questions/add-new-poll",
	async ({ optionOneText, optionTwoText, author }: NewPollPayload) => {
		const newPoll = await _saveQuestion({
			optionOneText,
			optionTwoText,
			author
		})
		// await store.dispatch(getInitUsersData())
		// await store.dispatch(getInitQuestionsData())
		return newPoll
	}
)

type VotePollPayload = {
	authedUser: string
	qid: string
	answer: "optionOne" | "optionTwo"
}

export const votePoll = createAsyncThunk(
	"questions/vote-poll",
	async ({ authedUser, qid, answer }: VotePollPayload) => {
		const newPoll = await _saveQuestionAnswer({
			authedUser,
			qid,
			answer
		})
		await store.dispatch(getInitUsersData())
		await store.dispatch(getInitQuestionsData())
		return newPoll
	}
)
