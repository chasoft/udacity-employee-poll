import { type LoaderFunctionArgs, Outlet } from "react-router"

import { usePageTitle } from "~/shared/usePageTitle"

import "./AuthenLayout.scss"

export const authenLoader = ({ request }: LoaderFunctionArgs) => {
	console.log("authenLoader", request)
	return null
}

export function AuthenLayout() {
	const title = usePageTitle()
	return (
		<div className="authen-layout">
			<header>{title}</header>
			<main>
				<Outlet />
			</main>
		</div>
	)
}
