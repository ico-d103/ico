import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import CollapseMenu from "../../../common/CollapseMenu/CollapseMenu"

function StudentDetail() {
	return (
		<>
			<h1 css={headerCSS}>학생 정보 상세보기</h1>
			<div css={studentWrapperCSS}>
				<div>
					<div css={studentNameCSS}>사공지은</div>
					<Button
						text={"직업 초기화"}
						fontSize={`var(--teacher-h5)`}
						width={"100px"}
						height={"28px"}
						theme={"warning"}
						onClick={() => {}}
					/>
				</div>
				<div>계좌 정지</div>
			</div>
			<div css={contentWrapperCSS}>
				<CollapseMenu title={"미소 지급 및 차감"}>
					<></>
				</CollapseMenu>
			</div>
		</>
	)
}

const headerCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
`

const studentWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 15px;
	}
`

const studentNameCSS = css`
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
`

const contentWrapperCSS = css``

export default StudentDetail
