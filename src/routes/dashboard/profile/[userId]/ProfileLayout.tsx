import { Outlet } from "react-router"

import "./ProfileLayout.scss"

export function ProfileLayout() {
	return (
		<div className="profile-layout">
			<Outlet />
		</div>
	)
}
