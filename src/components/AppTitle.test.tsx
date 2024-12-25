import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router"

import { AppTitle } from "./AppTitle"

test("renders app title", () => {
	render(
		<BrowserRouter>
			<AppTitle />
		</BrowserRouter>
	)
	const titleElement = screen.getByText(/Employee Polly/i)
	expect(titleElement).toBeInTheDocument()
})
