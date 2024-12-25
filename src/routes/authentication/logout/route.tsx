import { redirect } from "react-router"

import { ACTION_LOGOUT } from "~/+state/slices/auth"
import { store } from "~/+state/store"

export function logoutLoader() {
	store.dispatch(ACTION_LOGOUT())
	return redirect("/login")
}
