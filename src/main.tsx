import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router/dom"

import { store } from "./+state/store"
import { appRouter } from "./routes/AppRouter"

import "./shared/reset.css"
import "./shared/theme.scss"
import "./index.scss"

const rootElement = document.getElementById("root")

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Provider store={store}>
				<RouterProvider router={appRouter} />
			</Provider>
		</StrictMode>
	)
}
