import { Link } from "react-router"

import type { User } from "~/shared/types"

import "./Avatar.scss"

type AvatarProps = {
	user: User
	className?: string
}

export function Avatar({ user, className = "" }: AvatarProps) {
	return (
		<Link className={className} to={`/dashboard/profile/${user.id}`}>
			<div className="avatar">
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
		</Link>
	)
}
