import { createBrowserRouter } from "react-router"

import { ErrorBoundary } from "./ErrorBoundary"
import { RootLayout } from "./Layout"
import { HomePage } from "./home/route"

export const appRouter = createBrowserRouter([
	{
		id: "root-layout",
		path: "/",
		element: <RootLayout />,
		ErrorBoundary: ErrorBoundary,
		children: [
			{
				id: "home-page",
				path: "/",
				element: <HomePage />
			}
		]
	}
])
