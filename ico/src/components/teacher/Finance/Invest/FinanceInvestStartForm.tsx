import React from "react"
import { css } from "@emotion/react"
import Form from "@/components/teacher/common/Form/Form"
import Test from "@/components/teacher/common/Form/Test"
import Button from "@/components/common/Button/Button"

import Modal from "@/components/common/Modal/Modal"
import ModalContent from "@/components/common/Modal/ModalContent"
import useCompHandler from "@/hooks/useCompHandler"

import { CLASS_BIG_PROPERTY } from "@/components/teacher/Class/ClassIcons"
import FinanceInvestUseModalContent from "@/components/teacher/Finance/Invest/FinanceInvestUseModalContent"

import FormCreator from "../../common/Form/FormCreator"
import FinanceInvestCreate from "./FinanceInvestCreate"

function FinanceInvestStartForm() {
	const [openComp, closeComp, compState] = useCompHandler()

	const investStartTime = () => {
		alert("투자 시작 시간 설정")
	}

	const investEndTime = () => {
		alert("투자 종료 시간 설정")
	}

	return (
		<>
			<div css={contentCSS}>투자 종목 주제</div>
			<input css={inputCSS} />

			<div css={contentCSS}>거래 가능 시간</div>
			<div css={buttonsCSS}>
				<Button
					text={"시작 시간 선택"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={openComp}
				/>
				<Button
					text={"종료 시간 선택"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={openComp}
				/>
			</div>

			<FormCreator
				subComp={<FinanceInvestCreate />}
				idx={0}
				subInit={{ taxation: 0, value: 100 }}
				compState={compState}
				isNoTitle={true}
			/>

			<Modal
				compState={compState}
				closeComp={closeComp}
				transition={"scale"}
				content={
					<ModalContent
						width={"500px"}
						icon={CLASS_BIG_PROPERTY}
						title={"국고 사용하기"}
						content={FinanceInvestUseModalContent()}
					/>
				}
			/>
		</>
	)
}

const contentCSS = css`
	font-size: 1.1rem;
	margin-top: 20px;
`

const inputCSS = css`
	border: none;
	background-color: var(--common-back-color);
	height: 45px;
	border-radius: 10px;
`

const buttonsCSS = css`
	display: flex;
	flex-direction: row;
	gap: 5px;
`

export default FinanceInvestStartForm
