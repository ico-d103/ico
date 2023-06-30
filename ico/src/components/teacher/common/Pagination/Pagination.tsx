import { css } from "@emotion/react"
import PaginationButton from "./PaginationButton"
import { selectedPage } from "@/store/store"
import { useAtom } from "jotai"

type PaginationPropsType = {
	size: number // 페이지의 총 크기
	maxSize: number // 한 번에 보여줄 페이지의 크기
	margin: string
	buttonSize: string
}

function Pagination({ size, maxSize, margin, buttonSize }: PaginationPropsType) {
	const [selectedPageAtom, setSelectedPageAtom] = useAtom(selectedPage)

	const pageHandler = (flag: boolean) => {
		if (!flag && selectedPageAtom > 1) {
			setSelectedPageAtom(selectedPageAtom - 1)
		} else if (flag && selectedPageAtom < size) {
			setSelectedPageAtom(selectedPageAtom + 1)
		}
	}

	return (
		<div css={wrapperCSS(margin)}>
			<PaginationButton pgNumber={"<"} onClick={() => pageHandler(false)} buttonSize={buttonSize} />
			{Array.from({ length: size }).map((_, index) => {
				const page = Math.floor((selectedPageAtom - 1) / maxSize)

				// 현재 내 페이지에 맞게 버튼의 개수 그리기
				if (maxSize * page + 1 <= index + 1 && index + 1 <= maxSize * page + maxSize) {
					return (
						<PaginationButton
							key={index + 1}
							pgNumber={(index + 1).toString()}
							onClick={() => setSelectedPageAtom(index + 1)}
							buttonSize={buttonSize}
						/>
					)
				}
			})}
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
