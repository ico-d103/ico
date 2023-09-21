import { postTreasuryAPI } from "@/api/teacher/class/postTreasuryAPI"
import Button from "@/components/common/Button/Button"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import useNotification from "@/hooks/useNotification"
import { NUM_ONLY } from "@/util/regex"
import { css } from "@emotion/react"
import { useQueryClient } from "@tanstack/react-query"
import { useReducer } from "react"

function PowerPropertyModalContent() {
	const noti = useNotification()
	const queryClient = useQueryClient()
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
	const [inputState, dispatchInput] = useReducer(inputReducer, { title: "", source: "", amount: "" })

	const changeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		if (!NUM_ONLY.test(inputValue)) {
			inputValue = inputValue.replace(/\D/g, "")
			e.target.value = inputValue
			return
		}

		dispatchInput({ type: "CHANGE_AMOUNT", value: e.target.value })
	}

	const postTreasuryHandler = async (type: boolean) => {
		if (inputState.title === "" || inputState.amount === "" || inputState.source === "") {
			alert("빈칸을 모두 입력해주세요.")
			return
		}

		const amount = type ? inputState.amount : "-" + inputState.amount
		const numberAmount = Number(amount)

		const response = await postTreasuryAPI({
			body: { title: inputState.title, source: inputState.source, amount: numberAmount },
		})

		if (response === "OK") {
			dispatchInput({ type: "CHANGE_AMOUNT", value: "" })
			dispatchInput({ type: "CHANGE_SOURCE", value: "" })
			dispatchInput({ type: "CHANGE_TITLE", value: "" })

			noti({
				content: <NotiTemplate type={"ok"} content={type ? "입금되었습니다." : "출금되었습니다."} />,
				duration: 3000,
			})
		} else {
			noti({
				content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
				duration: 3000,
			})
		}
	}

	return (
		<div css={wrapperCSS} onClick={(e) => e.stopPropagation()}>
			<div css={inputWrapperCSS}>
				<div>금액을 입력해주세요.</div>
				<input placeholder="ex) 2000" onChange={changeAmountHandler} value={inputState.amount} />
			</div>
			<div css={inputWrapperCSS}>
				<div>사용 종류를 입력해주세요.</div>
				<input
					placeholder="ex) 세금"
					onChange={(e) => dispatchInput({ type: "CHANGE_SOURCE", value: e.target.value })}
					value={inputState.source}
				/>
			</div>
			<div css={inputWrapperCSS}>
				<div>사유를 입력해주세요.</div>
				<input
					placeholder="ex) 전기세, 자리세"
					onChange={(e) => dispatchInput({ type: "CHANGE_TITLE", value: e.target.value })}
					value={inputState.title}
				/>
			</div>
			<div css={buttonWrapperCSS}>
				<Button
					text={"출금하기"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"manageMinus"}
					onClick={() => postTreasuryHandler(false)}
				/>
				<Button
					text={"입금하기"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"mobileSoft3"}
					onClick={() => postTreasuryHandler(true)}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	> div {
		width: 80%;
	}
`

const inputWrapperCSS = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 35px;

	> input {
		border-radius: 10px;
		background: #fffae2;
		padding: 10px 15px;
		outline: none;
		border: 1px solid var(--student-main-color-5);
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 20px;
	margin-bottom: 20px;
`

export default PowerPropertyModalContent
