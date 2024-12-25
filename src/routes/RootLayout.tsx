import React from "react"
import { Outlet } from "react-router"

import { AppTitle } from "~/components/AppTitle"
import { HeaderNavigator } from "~/components/HeaderNavigator"

import "./RootLayout.scss"

export function RootLayout() {
	return (
		<div className="app-root-layout">
			<div className="root-content">
				<div className="root-header">
					<AppTitle />
					<HeaderNavigator />
				</div>
				<Outlet />
			</div>
		</div>
	)
}
