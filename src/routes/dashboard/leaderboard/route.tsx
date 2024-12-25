import React from "react"
import { useAppSelector } from "~/+state/hooks"
import { getLeaderboard, getUsers } from "~/+state/slices/users"
import { Avatar } from "~/components/Avatar"
import { PageTitle } from "~/components/PageTitle"

import "./route.scss"

export function LeaderBoardRoute() {
	const users = useAppSelector(getUsers)
	const leaderboard = useAppSelector(getLeaderboard)

	const sortedLeaderboard = Object.entries(leaderboard).sort(
		([, data1], [, data2]) =>
			data2.answered + data2.created - (data1.answered + data1.created)
	)
	console.log(leaderboard)
	return (
		<div className="leader-board-route">
			<PageTitle />
			<table>
				<thead>
					<tr>
						<th>Users</th>
						<th>Answered</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					{Object.values(leaderboard).length > 0 ? (
						sortedLeaderboard.map(([userId, { answered, created }]) => (
							<tr key={userId}>
								<td>
									<Avatar user={users[userId]} />
								</td>
								<td>{answered}</td>
								<td>{created}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={3} className="loading">
								<progress />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
