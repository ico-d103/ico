import React from "react"
import { css } from "@emotion/react"
import { CORPORATE_DELETE, CORPORATE_EDIT } from "../CorporateIcons"
import { flexColDisplay, flexRowDisplay } from "@/styles/mixin"

type GovCorporateCardProps = {
	// 추후 type 파일에서 관리
	corporate: {
		id: number
		logo: string
		name: string
		type: string
		ceo: string
		content: string
		firstMoney: number
		registNumber: string
	}
}

function GovCorporateCard({ corporate }: GovCorporateCardProps) {
	return (
		<div css={wrapperCSS} onClick={() => alert("기업 상세보기 이동!")}>
			<div css={menuCSS}>
				<div
					onClick={(e) => {
						alert("기업 정보 수정!")
						e.stopPropagation()
					}}
				>
					{CORPORATE_EDIT}
				</div>
				<div
					onClick={(e) => {
						alert("기업 삭제!")
						e.stopPropagation()
					}}
				>
					{CORPORATE_DELETE}
				</div>
			</div>
			<div css={topCSS}>
				<div css={logoCSS}>{corporate.logo}</div>
				<div css={topInfoCSS}>
					<h1>{corporate.name}</h1>
					<span>
						{corporate.type} | {corporate.ceo}
					</span>
				</div>
			</div>
			<div css={contentCSS}>{corporate.content}</div>
			<div css={divideCSS}></div>
			<div css={bottomCSS}>등록 번호 {corporate.registNumber}</div>
		</div>
	)
}

const wrapperCSS = css`
	cursor: pointer;
	padding: 25px;
	width: 350px;
	height: 240px;
	border-radius: 10px;
	border: 1.5px solid #e9ecf0;
	background: #fff;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	transition: all 0.2s;
	position: relative;
	${flexColDisplay}

	:hover {
		transform: scale(103%);
	}
`

const menuCSS = css`
	position: absolute;
	right: 25px;
	${flexRowDisplay}
	gap: 10px;

	> div {
		border: 1px solid rgb(238, 238, 238);
		background-color: rgb(248, 249, 250);
		border-radius: 5px;
		padding: 3px;
	}
`

const topCSS = css`
	${flexRowDisplay}
	align-items: center;
	gap: 15px;
`

const logoCSS = css`
	width: 60px;
	height: 60px;
	border-radius: 5px;
	background: #d9d9d9;
`

const topInfoCSS = css`
	${flexColDisplay}
	gap: 15px;

	> h1 {
		font-weight: 600;
	}

	> span {
		color: rgb(136, 136, 136);
	}
`

const contentCSS = css`
	width: 100%;
	height: 55px;
	margin: 20px 0;
	font-size: var(--teacher-h5);
`

const divideCSS = css`
	height: 1px;
	background: #e9ecf0;
`

const bottomCSS = css`
	margin-top: 20px;
	font-size: var(--teacher-h5);
`

export default GovCorporateCard
