import { css } from "@emotion/react"
import PaginationButton from "./PaginationButton"
import { selectedPage } from "@/store/store"
import { useAtom } from "jotai"
import { useEffect } from "react"

type PaginationPropsType = {
	size: number
	maxSize: number
	margin: string
	buttonSize: string
}

function Pagination({ size, maxSize, margin, buttonSize }: PaginationPropsType) {
	const [selectedPageAtom, setSelectedPageAtom] = useAtom(selectedPage)

	const pageHandler = (flag: boolean) => {
		// 이전 페이지 이동
		if (!flag && selectedPageAtom > 1) {
			setSelectedPageAtom(selectedPageAtom - 1)
		}
		// 다음 페이지 이동
		else if (flag && selectedPageAtom < size) {
			setSelectedPageAtom(selectedPageAtom + 1)
		}
	}

	const dynamicPaginationButton = () => {
		const buttons = []

		for (let i = selectedPageAtom; i < selectedPageAtom + maxSize; i++) {
			if (i > size) break

			buttons.push(
				<PaginationButton
					key={i}
					pgNumber={i.toString()}
					onClick={() => setSelectedPageAtom(i)}
					buttonSize={buttonSize}
				/>,
			)
		}

		return buttons
	}

	useEffect(() => {
		console.log(selectedPageAtom)

		// if (selectedPageAtom > maxSize) {
		// 	dynamicPaginationButton()
		// }
	}, [selectedPageAtom])

	return (
		<div css={wrapperCSS(margin)}>
			<PaginationButton pgNumber={"<"} onClick={() => pageHandler(false)} buttonSize={buttonSize} />
			{size <= maxSize
				? Array.from({ length: size }, (_, index) => (
						<PaginationButton
							key={index}
							pgNumber={(index + 1).toString()}
							onClick={() => setSelectedPageAtom(index + 1)}
							buttonSize={buttonSize}
						/>
				  ))
				: dynamicPaginationButton()}

			<PaginationButton pgNumber={">"} onClick={() => pageHandler(true)} buttonSize={buttonSize} />
		</div>
	)
}

const wrapperCSS = (margin: string) => {
	return css`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin: ${margin};
	`
}

export default Pagination
