import { css } from "@emotion/react"
import useGetNation from "@/hooks/useGetNation"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import { useReducer } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAccountAPI } from "@/api/teacher/class/postAccountAPI"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import useNotification from "@/hooks/useNotification"
import { NUM_ONLY } from "@/util/regex"

type ClassStudentDetailMoneyPropsType = {
	refetch?: any
	studentId: number
}

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

function ClassStudentDetailMoney({ refetch, studentId }: ClassStudentDetailMoneyPropsType) {
	const noti = useNotification()
	const [nation] = useGetNation()
	const queryClient = useQueryClient()
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
		const args = { studentId: studentId, body: { title: inputState.title, amount: amount } }

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

				queryClient.invalidateQueries(["studentList", "entered"])
				queryClient.invalidateQueries(["enteredStudentDetail", studentId])
				// refetch()
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
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
		<>
			<Input
				theme={"greenDefault"}
				placeholder="사유를 입력해 주세요"
				customCss={reasonCSS}
				isTextarea={false}
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => dispatchInput({ type: "CHANGE_TITLE", value: e.target.value })}
			/>
			<Input
				theme={"greenDefault"}
				placeholder={nation.currency}
				customCss={moneyCSS}
				isTextarea={false}
				onClick={(e) => e.stopPropagation()}
				onChange={changeAmountHandler}
			/>
			<Button
				text={"지급"}
				fontSize={`var(--teacher-h6)`}
				width={"50px"}
				height={"30px"}
				theme={"managePlus"}
				margin={"0 10px 0 0"}
				onClick={(e) => {
					e.stopPropagation()
					postAccountHandler("plus")
				}}
			/>
			<Button
				text={"차감"}
				fontSize={`var(--teacher-h6)`}
				width={"50px"}
				height={"30px"}
				theme={"manageMinus"}
				onClick={(e) => {
					e.stopPropagation()
					postAccountHandler("minus")
				}}
			/>
		</>
	)
}

const reasonCSS = css`
	width: 200px;
	height: 30px;
	margin-right: 20px;
`

const moneyCSS = css`
	width: 80px;
	height: 30px;
	margin-right: 20px;
`

export default ClassStudentDetailMoney
