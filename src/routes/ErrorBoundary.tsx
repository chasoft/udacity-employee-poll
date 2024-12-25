import { useNavigate, useRouteError } from "react-router"
import { Button } from "~/components/Button"

import "./ErrorBoundary.scss"

export function ErrorBoundary() {
	const error = (useRouteError() ?? {}) as { status: number; message: string }
	const navigate = useNavigate()

	const errorMessage =
		error.status === 404
			? "Ops, requested URL not found"
			: error.message
				? error.message
				: "Ops, something wrong happened. Unknown reason."

	return (
		<div className="error-boundary">
			<div className="content">
				<h2>{error.status}</h2>
				{errorMessage}
			</div>
			<div className="btn-group">
				<Button kind="ghost" onClick={() => window.location.reload()}>
					Refresh
				</Button>
				<Button kind="outline" onClick={() => navigate(-1)}>
					Go Back
				</Button>
				<Button onClick={() => navigate("/")}>Go Home</Button>
			</div>
		</div>
	)
}
