import { type LoaderFunctionArgs, Outlet, redirect } from "react-router"

import { getInitQuestionsData } from "~/+state/actions/questions"
import { getInitUsersData } from "~/+state/actions/users"
import { store } from "~/+state/store"

import "./DashboardLayout.scss"

export const dashboardLayoutLoader = ({ request }: LoaderFunctionArgs) => {
	const loggedInUser = store.getState().auth.data

	if (!loggedInUser) {
		const url = new URL(request.url)
		const redirectUrl = url.pathname + url.search
		const loginUrl =
			redirectUrl === "/login"
				? "/login"
				: `/login?redirect=${encodeURIComponent(redirectUrl)}`
		return redirect(loginUrl)
	}

	/* If the user loggedIn, we will fetch init data */
	store.dispatch(getInitUsersData())
	store.dispatch(getInitQuestionsData())

	/* Return nothing =)) */
	return null
}

export function DashboardLayout() {
	return (
		<div className="dashboard-layout">
			<Outlet />
		</div>
	)
}
