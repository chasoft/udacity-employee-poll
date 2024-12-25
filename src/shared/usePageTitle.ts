import { useMatches } from "react-router"

type UsePageTitleProps = {
	/**
	 * A fallback if page title not found in handle object
	 */
	titleNotFound: string
}

export function usePageTitle(
	{ titleNotFound }: UsePageTitleProps = { titleNotFound: "Page Title Missing" }
) {
	const matches = useMatches()
	const handle = matches[matches.length - 1].handle as Record<string, string>
	return handle?.title ?? titleNotFound
}
