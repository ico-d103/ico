import React from "react"
import { css } from "@emotion/react"
import { CLASS_JOB_SEARCH } from "@/components/teacher/Class/ClassIcons"
import ClassJobSearchList from "@/components/teacher/Class/JobSearch/ClassJobSearchList"

function jobsearch() {
	return (
		<div css={wrapperCSS}>
			<h1>구인 구직</h1>
			<div css={titleCSS}>
				<div>{CLASS_JOB_SEARCH}</div>
				<div>
					현재 구직 중인 직업은 <b>6개</b>입니다.
				</div>
			</div>
			<ClassJobSearchList />
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;

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

export default jobsearch
