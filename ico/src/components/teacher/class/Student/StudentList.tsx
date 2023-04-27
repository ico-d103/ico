import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

function StudentList() {
	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<h2>학생 정보</h2>
				<Button
					text={"직업 초기화"}
					fontSize={`var(--teacher-h4)`}
					width={"128px"}
					theme={"normal"}
					onClick={() => {}}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css``

const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`

export default StudentList
