import { appConfig } from "../../shared/config"

import "./route.scss"

export function HomePage() {
	return (
		<main className="poll-home">
			<header>{appConfig.title}</header>
			<section className="page-content">Hello world</section>
		</main>
	)
}
