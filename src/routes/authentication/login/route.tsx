import React from "react"
import {
	type ActionFunctionArgs,
	Form,
	redirect,
	useActionData
} from "react-router"

import { doLogin } from "~/+state/actions/auth"
import { store } from "~/+state/store"
import { Button } from "~/components/Button"

import "./route.scss"

export const loginLoader = () => {
	const loggedInUser = store.getState().auth.data
	if (loggedInUser) {
		return redirect("/dashboard")
	}
	return null
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const username = formData.get("username") as string
	const password = formData.get("password") as string

	const loginResponse = await store.dispatch(doLogin({ username, password }))

	if (loginResponse.type === "auth/do-login/fulfilled") {
		const url = new URL(request.url)
		const redirectURL = url.searchParams.get("redirect") || "/dashboard"
		return redirect(redirectURL)
	}

	return { error: true, message: "Username or Password not correct!" }
}

export function LoginRoute() {
	const loginError = useActionData<Awaited<ReturnType<typeof loginAction>>>()

	return (
		<div className="login-route">
			<Form className="normal-form" method="post">
				<div className="form-group">
					<label htmlFor="username">Username (*)</label>
					<input
						type="text"
						id="username"
						name="username"
						defaultValue="sarahedo"
						autoComplete="username"
						required
						ref={(e) => e?.focus()}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password (*)</label>
					<input
						type="password"
						id="password"
						name="password"
						defaultValue="sarahedo"
						autoComplete="current-password"
						required
					/>
				</div>
				{loginError && "error" in loginError && (
					<div className="error-messsage">{loginError.message}</div>
				)}
				<Button type="submit" kind="primary" className="primaty-btn">
					Login
				</Button>
			</Form>
			<div className="note">
				<p>
					<strong>Note:</strong>
				</p>
				<ul>
					<li>Let you user username and password the same</li>
					<li>
						Available username is: "sarahedo", "tylermcginnis" and "johndoe"{" "}
					</li>
				</ul>
			</div>
		</div>
	)
}

export function LoginError() {
	return (
		<>
			<div>Error</div>
			<Button onClick={() => window.location.reload()}>Refresh</Button>
		</>
	)
}
