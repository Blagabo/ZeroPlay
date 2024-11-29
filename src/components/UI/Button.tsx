import React from "react"

interface ButtonProps {
	href: string
	children: React.ReactNode
	className?: string
}

const Button: React.FC<ButtonProps> = ({ href, children, className }) => {
	return (
		<a href={href}>
			<button className={`${className}`}>{children}</button>
		</a>
	)
}

export default Button
