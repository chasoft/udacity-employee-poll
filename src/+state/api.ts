import { store } from "./store"

/**
 * Use this function outside of React component scope
 */
export function _getLoggedInUser() {
	const loggedInUser = store.getState().auth.data
	return loggedInUser
}
