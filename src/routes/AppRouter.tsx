import React from "react"
import { createBrowserRouter } from "react-router"

import { ErrorBoundary } from "./ErrorBoundary"
import { RootLayout } from "./RootLayout"
import { AuthenLayout } from "./authentication/AuthenLayout"
import {
	LoginError,
	LoginRoute,
	loginAction,
	loginLoader
} from "./authentication/login/route"
import { logoutLoader } from "./authentication/logout/route"
import { RegisterRoute } from "./authentication/register/route"
import {
	DashboardLayout,
	dashboardLayoutLoader
} from "./dashboard/DashboardLayout"
import { PollLayout } from "./dashboard/[pollId]/PollLayout"
import { DeletePollRoute } from "./dashboard/[pollId]/delete/route"
import { EditPollRoute } from "./dashboard/[pollId]/edit/route"
import {
	ViewPollRoute,
	votePollAction,
	votePollLoader
} from "./dashboard/[pollId]/route"
import { LeaderBoardRoute } from "./dashboard/leaderboard/route"
import {
	NewPollRoute,
	newPollAction,
	newPollLoader
} from "./dashboard/new-poll/route"
import { ProfileLayout } from "./dashboard/profile/[userId]/ProfileLayout"
import { ProfileRoute } from "./dashboard/profile/[userId]/route"
import { DashboardRoute } from "./dashboard/route"
import { HomeRoute } from "./route"

export const appRouter = createBrowserRouter([
	{
		id: "root-layout",
		element: <RootLayout />,
		ErrorBoundary: ErrorBoundary,
		children: [
			{
				id: "home-route",
				index: true,
				path: "/",
				element: <HomeRoute />
			},
			{
				id: "dashboard-layout",
				path: "/dashboard",
				element: <DashboardLayout />,
				loader: dashboardLayoutLoader,
				children: [
					{
						index: true,
						id: "dashboard-route",
						path: "/dashboard",
						element: <DashboardRoute />,
						handle: {
							title: "Dashboard"
						}
					},
					{
						id: "new-poll-route",
						path: "/dashboard/new-poll",
						element: <NewPollRoute />,
						loader: newPollLoader,
						action: newPollAction,
						handle: {
							title: "New poll"
						}
					},
					{
						id: "leaderboard-route",
						path: "/dashboard/leaderboard",
						element: <LeaderBoardRoute />,
						handle: {
							title: "Leader board"
						}
					},
					{
						id: "profile-layout",
						path: "/dashboard/profile",
						element: <ProfileLayout />,
						children: [
							{
								index: true,
								id: "profile-route",
								path: "/dashboard/profile/:userId",
								element: <ProfileRoute />,
								handle: {
									title: "Profile"
								}
							},
							{
								id: "edit-profile-route",
								path: "/dashboard/profile/:userId/edit",
								element: <ProfileRoute />,
								handle: {
									title: "Edit Profile"
								}
							}
						]
					},
					{
						id: "poll-layout",
						path: "/dashboard/questions",
						element: <PollLayout />,
						children: [
							{
								id: "view-poll",
								path: "/dashboard/questions/:pollId",
								element: <ViewPollRoute />,
								loader: votePollLoader,
								action: votePollAction,
								handle: {
									title: "View Poll"
								}
							},
							{
								id: "edit-poll",
								path: "/dashboard/questions/:pollId/edit",
								element: <EditPollRoute />,
								handle: {
									title: "Edit Poll"
								}
							},
							{
								id: "delete-poll",
								path: "/dashboard/questions/:pollId/delete",
								element: <DeletePollRoute />,
								handle: {
									title: "Delete Poll"
								}
							}
						]
					}
				]
			},
			{
				id: "authen-layout",
				element: <AuthenLayout />,
				path: "/",
				children: [
					{
						id: "login-route",
						path: "/login",
						element: <LoginRoute />,
						loader: loginLoader,
						action: loginAction,
						errorElement: <LoginError />,
						handle: {
							title: "Login"
						}
					},
					{
						id: "logout-route",
						path: "/logout",
						loader: logoutLoader
					},
					{
						id: "register-route",
						path: "/register",
						element: <RegisterRoute />,
						handle: {
							title: "Register New Account"
						}
					}
				]
			}
		]
	}
])
