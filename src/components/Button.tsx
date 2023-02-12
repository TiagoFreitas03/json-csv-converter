import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string
}

export function Button({ icon, children, ...rest }: ButtonProps) {
	return (
		<button {...rest}>
			<i className={`fas fa-${icon}`} /> { children }
		</button>
	)
}
