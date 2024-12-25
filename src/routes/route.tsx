import React from "react"
import { useAppSelector } from "~/+state/hooks"
import { getLoggedInSession } from "~/+state/slices/auth"

import "./route.scss"

export function HomeRoute() {
	const loggedInUser = useAppSelector(getLoggedInSession)

	if (loggedInUser) {
		return (
			<div className="home-route">
				<h2>
					Welcome, <span className="logged-in-user">{loggedInUser.id}</span>
				</h2>
				<p>
					Let you go to Dashboard page and do something like Voting/Adding New
					Vote.
				</p>
			</div>
		)
	}

	return (
		<div className="home-route">
			<p>You are not logged in.</p>
			<p>Please log in to use our application.</p>
		</div>
	)
}
