import { css } from "@emotion/react"
import Form from "@/components/teacher/common/Form/Form"
import Test from "@/components/teacher/common/Form/Test"
import Button from "@/components/common/Button/Button"

function FinanceInvestStartForm() {
	const investStartTime = () => {
		console.log("investStartTime")
	}

	const investEndTime = () => {
		console.log("investEndTime")
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
					onClick={investStartTime}
				/>
				<Button
					text={"종료 시간 선택"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={investEndTime}
				/>
			</div>

			<Form
				mainInit={{ title: "zzzz", content: "hahaha" }}
				subInit={{ test: "asdf", test2: "" }}
				subInput={<Test />}
				idx={3}
				titlePlaceHolder={"제목을 입력해 주세요!"}
				contentPlaceHolder={"내용을 입력해 주세요!"}
				frontComp={<Test />}
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
	background-color: gray;
	height: 45px;
	border-radius: 10px;
`

const buttonsCSS = css`
	display: flex;
	flex-direction: row;
	gap: 5px;
`

export default FinanceInvestStartForm
