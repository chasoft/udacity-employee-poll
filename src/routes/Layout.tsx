import { Outlet, useLoaderData } from "react-router"

export function RootLayout() {
	const data = useLoaderData()
	return <Outlet context={data} />
}
