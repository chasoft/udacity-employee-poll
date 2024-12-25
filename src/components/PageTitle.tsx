import { IoArrowBackCircleOutline } from "react-icons/io5"
import { useNavigate } from "react-router"

import { usePageTitle } from "~/shared/usePageTitle"
import { Button } from "./Button"

import "./PageTitle.scss"

type PageTitleProps = {
	hasBackButton?: boolean
}

export function PageTitle({ hasBackButton }: PageTitleProps) {
	const title = usePageTitle()
	const navigate = useNavigate()
	return (
		<div className="page-title">
			{hasBackButton && (
				<Button kind="outline" onClick={() => navigate(-1)}>
					<IoArrowBackCircleOutline size={30} />
				</Button>
			)}
			<h2>{title}</h2>
		</div>
	)
}
