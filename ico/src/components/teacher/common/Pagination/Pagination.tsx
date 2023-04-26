import React from "react"
import { css } from "@emotion/react"
import PaginationButton from "./PaginationButton"

function Pagination() {
	return (
		<div css={wrapperCSS}>
			<PaginationButton pgNumber={"<"} />
			<PaginationButton pgNumber={"1"} />
			<PaginationButton pgNumber={"2"} />
			<PaginationButton pgNumber={"3"} />
			<PaginationButton pgNumber={"4"} />
			<PaginationButton pgNumber={"5"} />
			<PaginationButton pgNumber={">"} />
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 20px;
`

export default Pagination
