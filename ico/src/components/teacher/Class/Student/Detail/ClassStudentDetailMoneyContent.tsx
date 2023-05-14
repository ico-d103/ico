import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"
import { useReducer } from "react"
import { NUM_ONLY } from "@/util/regex"
import { postAccountAPI } from "@/api/teacher/class/postAccountAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

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
	const noti = useNotification()
	const queryClient = useQueryClient()
	const currency = localStorage.getItem("currency")
	const selectedStudentAtom = useAtomValue(selectedStudent)

	const [inputState, dispatchInput] = useReducer(inputReducer, { title: "", amount: "" })
	const postAccountMutation = useMutation((args: { studentId: number; body: { title: string; amount: string } }) =>
		postAccountAPI(args),
	)

	const postAccountHandler = (flag: string) => {
		if (inputState.title === "" || inputState.amount === "") {
			alert("빈칸을 모두 입력해주세요.")
			return
		}

		const amount = flag === "minus" ? "-" + inputState.amount : inputState.amount
		const args = { studentId: selectedStudentAtom, body: { title: inputState.title, amount: amount } }

		postAccountMutation.mutate(args, {
			onSuccess: () => {
				flag === "minus"
					? noti({
							content: <NotiTemplate type={"ok"} content={"성공적으로 차감되었습니다."} />,
							duration: 3000,
					  })
					: noti({
							content: <NotiTemplate type={"ok"} content={"성공적으로 지급되었습니다."} />,
							duration: 3000,
					  })
				return queryClient.invalidateQueries(["studentList", "entered"])
			},
		})
	}

	const changeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		if (!NUM_ONLY.test(inputValue)) {
			inputValue = inputValue.replace(/\D/g, "")
			e.target.value = inputValue
			return
		}

		dispatchInput({ type: "CHANGE_AMOUNT", value: e.target.value })
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
