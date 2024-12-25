import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router"
import "@testing-library/jest-dom"

import type { User } from "~/shared/types"
import { Avatar } from "./Avatar"

const mockUser: User = {
	id: "123",
	name: "John Doe",
	avatarURL: "https://example.com/avatar.jpg",
	answers: {},
	questions: []
}

test("renders avatar with user details", () => {
	render(
		<BrowserRouter>
			<Avatar user={mockUser} />
		</BrowserRouter>
	)

	const avatarImage = screen.getByAltText(/Avatar of John Doe/i)
	expect(avatarImage).toBeInTheDocument()
	expect(avatarImage).toHaveAttribute("src", mockUser.avatarURL)

	const userName = screen.getByText(mockUser.name)
	expect(userName).toBeInTheDocument()

	const userId = screen.getByText(mockUser.id)
	expect(userId).toBeInTheDocument()
})
