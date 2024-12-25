import { Link, useParams } from "react-router"

import { useAppSelector } from "~/+state/hooks"
import { getActivitiesByUserId } from "~/+state/slices/questions"
import { getLoadingStatus, getUserById } from "~/+state/slices/users"
import { PageTitle } from "~/components/PageTitle"

import "./route.scss"

export function ProfileRoute() {
	const { userId } = useParams()

	if (!userId) {
		throw { status: 404, message: "User Not Found" }
	}

	const isLoading = useAppSelector(getLoadingStatus)
	const user = useAppSelector(getUserById(userId))
	const activities = useAppSelector(getActivitiesByUserId(userId))

	return (
		<div className="profile-route">
			<PageTitle hasBackButton />
			<section>
				{isLoading ? (
					<div className="loading">
						<progress />
					</div>
				) : (
					<>
						<div className="profile-avatar">
							<img
								src={user.avatarURL}
								title={`Avatar of ${user.name}`}
								alt={`Avatar of ${user.name}`}
							/>
							<div className="info">
								<div className="name">{user.name}</div>
								<div>{user.id}</div>
							</div>
						</div>
						<div className="activities">
							<h3>Activities</h3>
							<ul>
								{activities.map((activity) => (
									<li key={activity.id}>
										<Link to={`/dashboard/questions/${activity.id}`}>
											{new Date(activity.timestamp).toLocaleString()}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</>
				)}
			</section>
		</div>
	)
}
