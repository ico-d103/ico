import React, { useState } from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { CLASS_PROPERTY } from "@/components/teacher/Class/ClassIcons"
import PropertyList from "@/components/teacher/Class/Property/ClassPropertyList"
import Pagination from "@/components/teacher/common/Pagination/Pagination"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import ClassPropertyUseModal from "@/components/teacher/Class/Property/ClassPropertyUseModal"

function property() {
	const { openComp, closeComp, compState } = useCompHandler()

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<h1>국고</h1>
				<Button text={"국고 사용"} fontSize={`var(--teacher-h4)`} width={"128px"} theme={"normal"} onClick={openComp} />
			</div>
			<div css={titleCSS}>
				<div>{CLASS_PROPERTY}</div>
				<div>
					현재 <b>123,456 미소</b>가 국고에 있어요.
				</div>
			</div>
			<div css={contentCSS}>
				<div>
					<h3 css={contentTitleCSS}>국고 입출금 내역</h3>
				</div>
				<PropertyList />
			</div>
			<Pagination />
			<Modal compState={compState} closeComp={closeComp} transition={"scale"} content={<ClassPropertyUseModal />} />
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

const contentCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const contentTitleCSS = css`
	margin-top: 30px;
	padding: 10px;
	display: inline-block;
	border-bottom: 2px solid #064f32;
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
`

export default property
