import { BiUpvote } from "react-icons/bi"
import {
	type ActionFunctionArgs,
	useFetcher,
	useLoaderData,
	useParams
} from "react-router"

import { votePoll } from "~/+state/actions/questions"
import { useAppSelector } from "~/+state/hooks"
import { getLoggedInUser } from "~/+state/slices/auth"
import { getQuestionById } from "~/+state/slices/questions"
import { store } from "~/+state/store"
import { Button } from "~/components/Button"
import { PageTitle } from "~/components/PageTitle"

import "./route.scss"
import { getLoadingStatus } from "~/+state/slices/users"

export const votePollLoader = () => {
	const loggedInSession = store.getState().auth.data
	return loggedInSession
}

export const votePollAction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const qid = formData.get("qid") as string
	const authedUser = formData.get("authedUser") as string
	const answer = formData.get("action") as "optionOne" | "optionTwo"

	const votedPoll = await store.dispatch(votePoll({ qid, authedUser, answer }))

	return votedPoll
}

export function ViewPollRoute() {
	const loggedInSession = useLoaderData<typeof votePollLoader>()
	const { pollId } = useParams()
	const fetcher = useFetcher()

	if (!pollId) {
		throw { status: 404, message: "Poll not found!" }
	}

	if (!loggedInSession) {
		throw { status: 403, message: "You are not allowed to access this page!" }
	}

	const isLoading = useAppSelector(getLoadingStatus)
	const question = useAppSelector(getQuestionById(pollId))
	const loggedInUser = useAppSelector(getLoggedInUser)

	if (!isLoading && !question) {
		throw { status: 404, message: "Poll not found!" }
	}

	const isAnswered = question ? !!loggedInUser.answers[question.id] : false
	const isOptionOneSelected = question?.optionOne.votes.includes(
		loggedInSession.id
	)
	const isOptionTwoSelected = question?.optionTwo.votes.includes(
		loggedInSession.id
	)

	return (
		<div className="view-poll-route">
			<PageTitle hasBackButton />
			<section>
				<p>
					Poll by <strong>{loggedInSession.name}</strong>
				</p>
				<img
					className="avatar"
					src={loggedInSession.avatarURL}
					title={`Avatar of ${loggedInSession.name}`}
					alt={`Avatar of ${loggedInSession.name}`}
				/>
				<p>Would You Rather</p>
				{question ? (
					<fetcher.Form method="post" className="options">
						<input type="hidden" name="qid" value={question.id} />
						<input type="hidden" name="authedUser" value={loggedInSession.id} />
						<div className={`item ${isOptionOneSelected ? "selected" : ""}`}>
							<p>{question.optionOne.text}</p>
							<Button
								type="submit"
								name="action"
								value="optionOne"
								kind="secondary"
								disabled={isAnswered}
							>
								<span>
									{isOptionOneSelected ? "You voted this option" : "Vote"}
								</span>
								{!isAnswered && <BiUpvote />}
							</Button>
						</div>
						<div className={`item ${isOptionTwoSelected ? "selected" : ""}`}>
							<p>{question.optionOne.text}</p>
							<Button
								type="submit"
								name="action"
								value="optionTwo"
								kind="secondary"
								disabled={isAnswered}
							>
								<span>
									{isOptionTwoSelected ? "You voted this option" : "Vote"}
								</span>
								{!isAnswered && <BiUpvote />}
							</Button>
						</div>
					</fetcher.Form>
				) : (
					<div className="progress-wrapper">
						<progress />
					</div>
				)}
			</section>
		</div>
	)
}
