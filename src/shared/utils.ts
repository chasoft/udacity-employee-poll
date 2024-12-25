import type { Question, User } from "./types"

export type AnsweredUnansweredQuestions = {
	answered: Question[]
	unanswered: Question[]
}

export function getAnsweredQuestionsAndUnansweredQuestions(
	user: User,
	questions: Question[]
): AnsweredUnansweredQuestions {
	const answeredQuestions = questions.reduce(
		(acc, curr) => {
			const questionsHasInfoOfVoter =
				curr.optionOne.votes.includes(user.id) ||
				curr.optionTwo.votes.includes(user.id)
			const userHasInfoOfVotedQuestion = user?.answers[curr.id]

			if (questionsHasInfoOfVoter && userHasInfoOfVotedQuestion) {
				acc.answered.push(curr)
			} else {
				acc.unanswered.push(curr)
			}
			return acc
		},
		{ answered: [], unanswered: [] } as AnsweredUnansweredQuestions
	)

	return answeredQuestions
}
