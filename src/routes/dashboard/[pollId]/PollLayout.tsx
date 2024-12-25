import { Outlet } from "react-router"

import "./PollLayout.scss"

export function PollLayout() {
	return (
		<div className="poll-layout">
			<Outlet />
		</div>
	)
}
