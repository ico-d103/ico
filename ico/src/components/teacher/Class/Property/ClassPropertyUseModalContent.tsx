import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { postTreasuryAPI } from "@/api/teacher/class/postTreasuryAPI"
import { useReducer } from "react"
import { NUM_ONLY } from "@/util/regex"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { selectedPage } from "@/store/store"
import { useAtomValue } from "jotai"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

type ClassPropertyUseModalPropsType = {
	closeComp: () => void
	isDepositMenuOpenAtom: boolean
}

const inputReducer = (
	state: { title: string; source: string; amount: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "CHANGE_AMOUNT":
			return { ...state, amount: action.value }
		case "CHANGE_TITLE":
			return { ...state, title: action.value }
		case "CHANGE_SOURCE":
			return { ...state, source: action.value }
		default:
			return state
	}
}

function ClassPropertyUseModal({ closeComp, isDepositMenuOpenAtom }: ClassPropertyUseModalPropsType) {
	const noti = useNotification()
	const queryClient = useQueryClient()
	const selectedPageAtom = useAtomValue(selectedPage)
	const currency = localStorage.getItem("currency")
	const [inputState, dispatchInput] = useReducer(inputReducer, { title: "", source: "", amount: "" })

	const postTreasuryMutation = useMutation((body: { title: string; source: string; amount: number }) =>
		postTreasuryAPI({ body }),
	)

	const changeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		if (!NUM_ONLY.test(inputValue)) {
			inputValue = inputValue.replace(/\D/g, "")
			e.target.value = inputValue
			return
		}

		dispatchInput({ type: "CHANGE_AMOUNT", value: e.target.value })
	}

	const postTreasuryHandler = () => {
		if (inputState.title === "" || inputState.amount === "" || inputState.source === "") {
			alert("빈칸을 모두 입력해주세요.")
			return
		}

		const amount = isDepositMenuOpenAtom ? inputState.amount : "-" + inputState.amount
		const numberAmount = Number(amount)

		postTreasuryMutation.mutate(
			{ title: inputState.title, source: inputState.source, amount: numberAmount },
			{
				onSuccess: () => {
					noti({
						content: (
							<NotiTemplate type={"ok"} content={isDepositMenuOpenAtom ? "입금되었습니다." : "출금되었습니다."} />
						),
						duration: 3000,
					})

					queryClient.invalidateQueries(["property"])
					queryClient.invalidateQueries(["propertyList", selectedPageAtom])
				},
				onError: () => {
					noti({
						content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
						duration: 3000,
					})
				},
			},
		)

		closeComp()
	}

	return (
		<>
			<div css={contentCSS}>
				<input
					type="text"
					placeholder={
						isDepositMenuOpenAtom ? `입금할 ${currency}를 입력해주세요.` : `출금할 ${currency}를 입력해주세요.`
					}
					onChange={changeAmountHandler}
				/>
				<input
					type="text"
					placeholder={isDepositMenuOpenAtom ? `누가 입금하나요?` : `누가 출금하나요?`}
					onChange={(e) => dispatchInput({ type: "CHANGE_SOURCE", value: e.target.value })}
				/>
				<textarea
					placeholder="사유를 입력해주세요."
					onChange={(e) => dispatchInput({ type: "CHANGE_TITLE", value: e.target.value })}
				></textarea>
			</div>
			<div css={buttonWrapperCSS}>
				<Button
					text={isDepositMenuOpenAtom ? "입금" : "출금"}
					fontSize={`var(--teacher-h5)`}
					width={"200px"}
					theme={"positive"}
					onClick={postTreasuryHandler}
				/>
				<Button text={"취소"} fontSize={`var(--teacher-h5)`} width={"200px"} theme={"cancelDark"} onClick={closeComp} />
			</div>
		</>
	)
}

const contentCSS = css`
	width: 100%;
	background-color: #d5dde9;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 20px;

	display: flex;
	flex-direction: column;

	> input {
		font-size: var(--teacher-h5);
		padding: 10px;
		background: none;
		border: none;
		outline: none;
		border-bottom: 1px solid rgba(138, 108, 108, 0.1);
	}

	> textarea {
		font-size: var(--teacher-h5);
		padding: 10px;
		resize: none;
		background: none;
		border: none;
		outline: none;
		height: 130px;
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 10px;
`

export default ClassPropertyUseModal
