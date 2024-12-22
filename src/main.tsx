import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router/dom";
import { appRouter } from "./routes/AppRouter";

import "./shared/reset.css";
import "./shared/theme.css";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<RouterProvider router={appRouter} />
		</StrictMode>,
	);
}
