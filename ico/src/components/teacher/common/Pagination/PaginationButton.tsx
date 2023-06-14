import { selectedPage } from "@/store/store"
import { css } from "@emotion/react"
import { useAtomValue } from "jotai"

type PaginationButtonPropsType = {
	pgNumber: string
	onClick: () => void
	buttonSize: string
}

function PaginationButton({ pgNumber, onClick, buttonSize }: PaginationButtonPropsType) {
	const selectedPageAtom = useAtomValue(selectedPage)

	return (
		<button
			css={pgNumber === selectedPageAtom.toString() ? selectedCSS(buttonSize) : buttonCSS(buttonSize)}
			onClick={onClick}
		>
			{pgNumber}
		</button>
	)
}

const buttonCSS = (buttonSize: string) => {
	return css`
		font-size: 1.2rem;
		width: ${buttonSize};
		height: ${buttonSize};
		background-color: var(--common-back-color-2);
		border: 1px solid rgb(240, 240, 240);
		border-radius: 5px;
		transition: all 0.1s;

		:hover {
			background-color: var(--teacher-main-color-2);
			color: var(--common-back-color-2);
		}
	`
}

const selectedCSS = (buttonSize: string) => {
	return css`
		font-size: var(--teacher-h3);
		width: ${buttonSize};
		height: ${buttonSize};
		background-color: var(--teacher-main-color-2);
		color: var(--common-back-color-2);
		border: 1px solid rgb(240, 240, 240);
		border-radius: 5px;
		transition: all 0.1s;
	`
}

export default PaginationButton
