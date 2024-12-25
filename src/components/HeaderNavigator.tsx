import { MdLogout } from "react-icons/md"
import { Link, useLocation, useNavigate } from "react-router"

import { useAppSelector } from "~/+state/hooks"
import { getLoggedInUser } from "~/+state/slices/auth"
import { Avatar } from "./Avatar"
import { Button } from "./Button"

import "./HeaderNavigator.scss"

export function HeaderNavigator() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const loggedInUser = useAppSelector(getLoggedInUser)

	if (!loggedInUser) {
		return (
			<div className="guest-navigator">
				<Button
					kind={pathname === "/login" ? "ghost" : undefined}
					size="sm"
					className="sub-btn"
					onClick={() => navigate("/login")}
				>
					Login
				</Button>
				<Button
					kind={pathname === "/register" ? "ghost" : undefined}
					size="sm"
					className="sub-btn"
					onClick={() => navigate("/register")}
				>
					Register
				</Button>
			</div>
		)
	}

	return (
		<nav className="loggedin-navigator">
			<div className="tabs">
				<Button
					size="sm"
					className={pathname === "/dashboard" ? "active" : ""}
					onClick={() => navigate("/dashboard")}
				>
					Dashboard
				</Button>
				<Button
					size="sm"
					className={pathname === "/dashboard/leaderboard" ? "active" : ""}
					onClick={() => navigate("/dashboard/leaderboard")}
				>
					Leader Board
				</Button>
				<Button
					size="sm"
					className={pathname === "/dashboard/new-poll" ? "active" : ""}
					onClick={() => navigate("/dashboard/new-poll")}
				>
					New Poll
				</Button>
			</div>
			<Avatar user={loggedInUser} />
			<Link to={"/logout"} className="logout-btn">
				<MdLogout />
			</Link>
		</nav>
	)
}
