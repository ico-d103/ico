import React, { useReducer } from "react"
import FormInput from "./FormInput"
import { css } from "@emotion/react"

const inputReducer = (state: any, action: any) => {
	if (action.type === "CHANGE_TITLE") {
		return { ...state, title: action.value }
	}
	if (action.type === "CHANGE_CONTENT") {
		return { ...state, content: action.value }
	}
	if (action.type === "CHANGE_ADDITIONAL") {
		return { ...state, additional: action.value }
	}
}

function Form() {
	const [inputState, dispatchInput] = useReducer(inputReducer, { title: "", content: "", additional: {} })

	const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatchInput({ type: "CHANGE_DATA1", value: event.target.value })
	}

	const contentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatchInput({ type: "CHANGE_DATA2", value: event.target.value })
	}

	return (
		<div css={formWrapperCSS}>
			<FormInput titleChangeHandler={titleChangeHandler} contentChangeHandler={contentChangeHandler}>
				dsa
			</FormInput>
		</div>
	)
}

const formWrapperCSS = css`
	background-color: var(--teacher-main-color-2);
	padding: 24px;
	border-radius: 10px;
	display: flex;
`

export default Form
