import React, { useState } from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { CLASS_PROPERTY } from "@/components/teacher/Class/ClassIcons"
import PropertyList from "@/components/teacher/Class/Property/PropertyList"
import Pagination from "@/components/teacher/common/Pagination/Pagination"
import Portal from "@/components/common/Portal/Portal"

function property() {
	const [openModal, setOpenModal] = useState<boolean>(false)

	const openModalHandler = () => {
		setOpenModal(true)
	}

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<h1>국고</h1>
				<Button
					text={"국고 사용"}
					fontSize={`var(--teacher-h4)`}
					width={"128px"}
					theme={"normal"}
					onClick={openModalHandler}
				/>
			</div>
			<div css={titleCSS}>
				<div>{CLASS_PROPERTY}</div>
				<div>
					현재 <b>123,456 미소</b>가 국고에 있어요.
				</div>
			</div>
			<div css={contentCSS}>
				<div css={contentTitleCSS}>국고 입출금 내역</div>
				<PropertyList />
			</div>
			<Pagination />
			{openModal && (
				<Portal>
					<></>
				</Portal>
			)}
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
	margin-top: 40px;
`

const contentTitleCSS = css`
	font-size: var(--teacher-h2);
	font-weight: bold;
	color: var(--teacher-main-color);
	padding: 10px;
	border-bottom: 2px solid #064f32;
	display: inline-block;
`

export default property
