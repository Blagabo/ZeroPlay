import React from "react"

interface ButtonProps {
	href: string
	children: React.ReactNode
	className?: string
}

const Button: React.FC<ButtonProps> = ({ href, children, className }) => {
	return (
		<button className={`${className}`}>
			<a href={href}>{children}</a>
		</button>
	)
}

export default Button
