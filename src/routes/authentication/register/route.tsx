import { type ActionFunctionArgs, Form } from "react-router"

import { Button } from "~/components/Button"

import "./route.scss"

export const registerAction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const realname = formData.get("realname")
	const username = formData.get("username")
	const password = formData.get("password")
	return { realname, username, password }
}

export function RegisterRoute() {
	return (
		<div className="register-route">
			<Form className="normal-form" method="post">
				<div className="form-group">
					<label htmlFor="realname">Real Name (*)</label>
					<input
						type="text"
						id="realname"
						name="realname"
						required
						ref={(e) => e?.focus()}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="username">Username (*)</label>
					<input type="text" id="username" name="username" required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password (*)</label>
					<input type="password" id="password" name="password" required />
				</div>
				<Button type="submit" className="primaty-btn">
					Register (Not Yet Implemented)
				</Button>
			</Form>
		</div>
	)
}
