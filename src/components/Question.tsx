import type { Question, User } from "~/shared/types"

import { Avatar } from "./Avatar"
import { Button } from "./Button"

import "./Question.scss"
import { Link } from "react-router"

type QuestionProps = {
	question: Question
	user: User
}

export function QuestionItem({ question, user }: QuestionProps) {
	return (
		<li className="question-block">
			<div className="author">
				<Avatar user={user} />
				<div className="date-time">
					{new Date(question.timestamp).toLocaleString()}
				</div>
			</div>
			<Link to={`/dashboard/questions/${question.id}`}>
				<Button kind="secondary" size="sm">
					View
				</Button>
			</Link>
		</li>
	)
}
