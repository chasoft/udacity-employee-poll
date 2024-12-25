import React from "react"

import { useAppSelector } from "~/+state/hooks"
import { getFilteredQuestions } from "~/+state/slices/questions"
import { getUsers } from "~/+state/slices/users"
import { PageTitle } from "~/components/PageTitle"
import { QuestionItem } from "~/components/Question"

import "./route.scss"

export function DashboardRoute() {
	const questions = useAppSelector(getFilteredQuestions)
	const users = useAppSelector(getUsers)

	return (
		<main className="dashboard-route">
			<PageTitle />
			<section>
				<h3>New Polls</h3>
				<ul className="questionsList">
					{questions.unanswered.map((question) => (
						<QuestionItem
							key={question.id}
							question={question}
							user={users[question.author]}
						/>
					))}
				</ul>
			</section>
			<section>
				<h3>Answered Poll</h3>
				<ul className="questionsList">
					{questions.answered.map((question) => (
						<QuestionItem
							key={question.id}
							question={question}
							user={users[question.author]}
						/>
					))}
				</ul>
			</section>
			<LoadingOverlay />
		</main>
	)
}

function LoadingOverlay() {
	const qStatus = useAppSelector((state) => state.questions.status)
	const uStatus = useAppSelector((state) => state.users.status)

	if (qStatus === "loading" || uStatus === "loading") {
		return (
			<div className="loading-layer">
				<progress />
			</div>
		)
	}
	return null
}
