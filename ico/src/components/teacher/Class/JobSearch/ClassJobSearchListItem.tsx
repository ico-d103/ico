import React from "react"
import { css } from "@emotion/react"
import Image from "next/image"

type ClassJobSearchListItemPropsType = {
	mock: {
		id: number
		jobname: string
		needcount: number
		applycount: number
		grade: number
		money: number
	}
}

function ClassJobSearchListItem({ mock }: ClassJobSearchListItemPropsType) {
	return (
		<div css={wrapperCSS}>
			<div css={imageWrapperCSS}>
				<Image src={"/assets/job/weather_caster.png"} alt={mock.jobname} width={150} height={250} />
				{mock.applycount !== 0 && <span>{mock.applycount}</span>}
			</div>
			<div css={contentWrapperCSS}>
				<div css={firstContentCSS}>
					<h4>{mock.jobname}</h4>
					{mock.needcount !== 0 ? <h5>{mock.needcount}명 모집중</h5> : <h5>담당 학생</h5>}
				</div>
				<div css={divideLineCSS}></div>
				<div css={secondContentCSS}>
					<h5>{mock.grade}등급 이상</h5>
					<h5>일급 {mock.money} 미소</h5>
				</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 250px;
	height: 350px;
	background: var(--common-back-color-2);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	transition: all 0.2s;
	overflow: hidden;
	cursor: pointer;

	:hover {
		transform: scale(1.1);
	}
`

const imageWrapperCSS = css`
	height: 240px;
	background-color: #007bc0;
	position: relative;
	overflow: hidden;

	> img {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 1;
	}

	> span {
		position: absolute;
		bottom: 1px;
		right: 10px;

		font-size: 130px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.7);
	}
`

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	h4 {
		font-size: var(--teacher-h4);
	}

	h5 {
		font-size: var(--teacher-h5);
	}
`

const divideLineCSS = css`
	border: 1px solid rgba(0, 0, 0, 0.08);
`

const firstContentCSS = css`
	padding: 15px 10px 10px 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	> h4 {
		font-weight: bold;
	}
`

const secondContentCSS = css`
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
`

export default ClassJobSearchListItem
