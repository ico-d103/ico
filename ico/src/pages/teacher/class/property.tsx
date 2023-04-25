import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button"
import { CLASS_PROPERTY } from "@/components/teacher/class/ClassIcons"
import PropertyList from "@/components/teacher/class/PropertyList"

function property() {
	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<h1>국고</h1>
				<Button text={"국고 사용"} fontSize={`var(--teacher-h5)`} width={"128px"} theme={"normal"} />
			</div>
			<div css={titleCSS}>
				<div>{CLASS_PROPERTY}</div>
				<div>
					현재 <b>123,456 미소</b>가 국고에 있어요.
				</div>
			</div>
			<div css={contentTitleCSS}>국고 사용 내역</div>
			<PropertyList />
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 100%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const titleCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 30px;

	> div:nth-of-type(1) {
		margin-right: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	> div:nth-of-type(2) {
		font-size: var(--teacher-h2);

		> b {
			font-weight: bold;
			color: var(--teacher-main-color);
		}
	}
`

const contentTitleCSS = css`
	margin-top: 40px;
	font-size: var(--teacher-h2);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
`

export default property
