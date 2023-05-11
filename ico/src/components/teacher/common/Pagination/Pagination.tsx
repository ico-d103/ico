import { css } from "@emotion/react"
import PaginationButton from "./PaginationButton"
import { selectedPage } from "@/store/store"
import { useAtom } from "jotai"

type PaginationPropsType = {
	size: number
}

function Pagination({ size }: PaginationPropsType) {
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

	const changePageHandler = (page: number) => {
		setSelectedPageAtom(page)
	}

	return (
		<div css={wrapperCSS}>
			<PaginationButton pgNumber={"<"} onClick={() => pageHandler(false)} />
			{Array.from({ length: size }, (_, index) => (
				<PaginationButton key={index} pgNumber={(index + 1).toString()} onClick={() => changePageHandler(index + 1)} />
			))}
			<PaginationButton pgNumber={">"} onClick={() => pageHandler(true)} />
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin-top: 30px;
`

export default Pagination
