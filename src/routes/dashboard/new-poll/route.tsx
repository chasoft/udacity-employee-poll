import {
	type ActionFunctionArgs,
	redirect,
	useFetcher,
	useLoaderData
} from "react-router"

import { addNewPoll } from "~/+state/actions/questions"
import { store } from "~/+state/store"
import { Button } from "~/components/Button"

import "./route.scss"

export const newPollLoader = () => {
	const loggedInSession = store.getState().auth.data
	return loggedInSession
}

export const newPollAction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const optionOneText = formData.get("optionOne") as string
	const optionTwoText = formData.get("optionTwo") as string
	const userId = formData.get("userId") as string
	const newPoll = await store.dispatch(
		addNewPoll({ optionOneText, optionTwoText, author: userId })
	)

	if (newPoll) {
		return redirect("/dashboard")
	}

	return { error: true, message: "Add new poll fail for unknown reason." }
}

export function NewPollRoute() {
	const fetcher = useFetcher()
	const loggedInSession = useLoaderData<typeof newPollLoader>()

	if (!loggedInSession) {
		throw { status: 403, message: "You are not allowed to access this page!" }
	}

	return (
		<div className="new-poll-route">
			<div className="question">
				<h2>Would You Rather</h2>
				<div>Create Your Own Poll</div>
			</div>
			<fetcher.Form className="normal-form" method="post">
				<div className="form-group">
					<label htmlFor="optionOne">First Option</label>
					<input
						type="text"
						id="optionOne"
						name="optionOne"
						placeholder="Option one"
						required
						ref={(e) => e?.focus()}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="optionTwo">Second Option</label>
					<input
						type="optionTwo"
						id="optionTwo"
						name="optionTwo"
						placeholder="Option two"
						required
					/>
				</div>
				<input type="hidden" name="userId" value={loggedInSession.id} />
				<Button type="submit" kind="primary" className="primaty-btn">
					{fetcher.state === "submitting" ? "Creating..." : "Create Poll"}
				</Button>
			</fetcher.Form>
		</div>
	)
}
