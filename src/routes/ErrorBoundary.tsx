import { useNavigate, useRouteError } from "react-router";

import "./ErrorBoundary.scss";

type Error = Partial<{
	status: number;
	statusText: string;
	internal: boolean;
	data: string;
	error: Record<string, unknown>;
}>;

export function ErrorBoundary() {
	const error = (useRouteError() ?? {}) as Error;
	const navigate = useNavigate();
	const errorMessage =
		error.status === 404
			? "404: Page Not Found"
			: "Ops, something wrong happened";
	return (
		<div className="error-boundary">
			{errorMessage}
			<div className="btn-group">
				<button
					type="button"
					className="btn go-back"
					onClick={() => navigate(-1)}
				>
					Go Back
				</button>
				<button
					type="button"
					className="btn go-home"
					onClick={() => navigate("/")}
				>
					Go Home
				</button>
			</div>
		</div>
	);
}
