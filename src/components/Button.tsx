import clsx from "clsx"
import React, { type ButtonHTMLAttributes } from "react"

import "./Button.scss"

type ButtonKind = "primary" | "secondary" | "outline" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

type ButtonProps = Partial<{
	kind: ButtonKind
	size: ButtonSize
}> &
	ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	kind = "primary",
	size = "md",
	children,
	className,
	...restProps
}: ButtonProps) {
	return (
		<button
			type="button"
			className={clsx("btn-default-style", kind, size, className)}
			{...restProps}
		>
			{children}
		</button>
	)
}
