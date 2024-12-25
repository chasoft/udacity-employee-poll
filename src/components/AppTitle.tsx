import { Link } from "react-router"

import { appConfig } from "~/shared/config"

import "./AppTitle.scss"

export function AppTitle() {
	return (
		<Link to="/">
			<div className="app-title">{appConfig.title}</div>
		</Link>
	)
}
