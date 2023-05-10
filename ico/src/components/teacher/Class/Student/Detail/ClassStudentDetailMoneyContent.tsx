import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"
import { useReducer } from "react"
import { NUM_ONLY } from "@/util/regex"
import { postAccountAPI } from "@/api/teacher/class/postAccountAPI"

const inputReducer = (state: { title: string; amount: string }, action: { type: string; value: string }) => {
	switch (action.type) {
		case "CHANGE_TITLE":
			return { ...state, title: action.value }
		case "CHANGE_AMOUNT":
			return { ...state, amount: action.value }
		default:
			return state
	}
}

function ClassStudentDetailMoneyContent() {
	const currency = localStorage.getItem("currency")
	const selectedStudentAtom = useAtomValue(selectedStudent)

	const [inputState, dispatchInput] = useReducer(inputReducer, { title: "", amount: "" })

	const changeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		if (!NUM_ONLY.test(inputValue)) {
			inputValue = inputValue.replace(/\D/g, "")
			e.target.value = inputValue
			return
		}

		dispatchInput({ type: "CHANGE_AMOUNT", value: e.target.value })
	}

	const postAccountHandler = (flag: string) => {
		const amount = flag === "minus" ? "-" + inputState.amount : inputState.amount

		postAccountAPI({ studentId: selectedStudentAtom, bodyType: { title: inputState.title, amount: amount } })
			.then((res) => {
				// 학생 목록 리스트에서 금액 업데이트
			})
			.catch((error) => {
				// 학생의 금액이 부족해서 차감 못하는 경우
				if (error.response.code === "11") {
					alert(error.response.message)
				}
			})
	}

	return (
		<div css={wrapperCSS}>
			<textarea
				css={reasonWrapperCSS}
				placeholder="사유를 입력해주세요."
				onChange={(e) => dispatchInput({ type: "CHANGE_TITLE", value: e.target.value })}
			></textarea>
			<div>
				<div css={moneyInputCSS}>
					<input type="text" placeholder="금액 입력" onChange={changeAmountHandler} />
					<span>{currency}</span>
				</div>
				<div css={buttonWrapperCSS}>
					<Button
						text={"지급"}
						fontSize={`var(--teacher-h5)`}
						width={"70px"}
						height={"40px"}
						theme={"positive"}
						onClick={() => postAccountHandler("plus")}
					/>
					<Button
						text={"차감"}
						fontSize={`var(--teacher-h5)`}
						width={"70px"}
						height={"40px"}
						theme={"warning"}
						onClick={() => postAccountHandler("minus")}
					/>
				</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;

	> div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}
`

const reasonWrapperCSS = css`
	width: 100%;
	min-height: 100px;
	background: rgba(159, 159, 159, 0.2);
	border-radius: 10px;
	padding: 15px;
	resize: none;
	outline: none;
	border: none;
	font-size: var(--teacher-h5);
`

const moneyInputCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;

	> input {
		outline: none;
		border: none;
		font-size: var(--teacher-h5);
		background: rgba(159, 159, 159, 0.2);
		border-radius: 10px;
		padding: 0 15px;
		height: 100%;
	}

	> span {
		font-size: var(--teacher-h5);
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 10px;
`

export default ClassStudentDetailMoneyContent
