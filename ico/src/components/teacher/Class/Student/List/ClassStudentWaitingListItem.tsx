import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

type StudentWaitingListItemPropsType = {
	mock: {
		id: number
		number: number
		name: string
	}
}

function StudentWaitingListItem({ mock }: StudentWaitingListItemPropsType) {
	return (
		<div css={wrapperCSS(mock.id)}>
			<div css={leftWrapperCSS}>
				<h4>{mock.number}</h4>
				<h4>{mock.name}</h4>
			</div>
			<div css={rightWrapperCSS}>
				<Button
					text={"승인"}
					fontSize={`var(--teacher-h5)`}
					width={"80px"}
					height={"30px"}
					theme={"positive"}
					onClick={() => {}}
				/>
				<Button
					text={"반려"}
					fontSize={`var(--teacher-h5)`}
					width={"80px"}
					height={"30px"}
					theme={"warning"}
					onClick={() => {}}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = (id: number) => {
	return css`
		width: 100%;
		padding: 10px 15px;
		background-color: ${id % 2 === 0 ? `var(--teacher-main-color-op-2)` : `var(--common-back-color-2)`};
		border-radius: 10px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	`
}

const leftWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;

	> h4 {
		font-size: var(--teacher-h4);
	}

	> h4:nth-of-type(1) {
		font-weight: bold;
	}
`

const rightWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;
`

export default StudentWaitingListItem