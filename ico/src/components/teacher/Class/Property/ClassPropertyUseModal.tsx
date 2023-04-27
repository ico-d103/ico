import React from "react"
import { css } from "@emotion/react"
import { CLASS_BIG_PROPERTY } from "@/components/teacher/Class/ClassIcons"

// 1. contentCSS 안에는 본인의 커스텀 컨텐츠 넣기
// 2. buttonWrapperCSS 의 너비도 props로 받기

function ClassPropertyUseModal() {
	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div>{CLASS_BIG_PROPERTY}</div>
				<h2>국고 사용하기</h2>
			</div>
			<div css={contentWrapperCSS}>
				<div css={contentCSS}>컨텐츠</div>
				<div css={buttonWrapperCSS}>
					<button>컨텐츠 안 버튼1</button>
					<button>컨텐츠 안 버튼2</button>
				</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 500px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);

	display: flex;
	flex-direction: column;
	align-items: center;
`

const headerCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	padding: 30px;

	> h2 {
		font-size: var(--teacher-h2);
	}
`

const contentWrapperCSS = css`
	width: 500px;
	padding: 30px;
	background: #f6f8fa;
	border-radius: 0px 0px 10px 10px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);

	display: flex;
	flex-direction: column;
	align-items: center;
`

const contentCSS = css``

const buttonWrapperCSS = css``

export default ClassPropertyUseModal
