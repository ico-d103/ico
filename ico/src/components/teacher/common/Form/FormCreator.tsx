import React from "react"
import Form from "../../common/Form/Form"
import Button from "@/components/common/Button/Button"
import { css } from "@emotion/react"
import Dropdown from "@/components/common/Dropdown/Dropdown"
import useCompHandler from "@/hooks/useCompHandler"

type FormCreatorProps = {
	idx: number
	subComp: any
	frontComp?: any
	compState?: boolean
	closeCompHandler?: Function
	
	isNoTitle?: boolean
	titlePlaceHolder?: string
	contentPlaceHolder?: string
	submitLabel?: string
	mainInit?: { title: string; content: string }
	subInit?: { 추가항목: string }
}

function FormCreator({ subComp, frontComp, idx, mainInit, subInit, closeCompHandler,  titlePlaceHolder, contentPlaceHolder, submitLabel, isNoTitle = false, compState = true }: FormCreatorProps) {
	if (compState || !closeCompHandler) {
		return (
			<Form
				mainInit={mainInit ? mainInit : { title: "", content: "" }}
				subInit={subInit ? subInit : { 추가항목: "" }}
				subInput={<SubmitRender subComp={subComp} submitLabel={submitLabel} />}
				idx={idx}
				titlePlaceHolder={titlePlaceHolder ? titlePlaceHolder : '제목을 입력해 주세요.'}
				contentPlaceHolder={contentPlaceHolder ? contentPlaceHolder : '내용을 입력해 주세요.'}
				closeComp={closeCompHandler}
				noTitle={isNoTitle}
				frontComp={frontComp}
			/>
		)
	} else {
		return <React.Fragment />
	}
	
}


// --------------------------------------------------------------------------------------------------------------------------------


type SubmitRenderProps = {
	subComp: any
	subInputChangeHandler?: Function
	inputState?: {
		title: string
		content: string
		sub: {
			추가항목: string
		}
	}
	closeHandler?: Function
	submitLabel?: string
}

const SubmitRender = ({subComp, subInputChangeHandler, inputState, closeHandler, submitLabel }: SubmitRenderProps) => {
	// 추가적인 입력 창, 정보를 띄우는 부분입니다.

	// subInputChangeHandler 함수
	// subInputChangeHandler({key: 제목, value: 내용}) 으로 정보를 저장합니다.
	// 혹은 subInputChangeHandler({key: 제목, event: event}) 형태로 input태그의 onChange와 연결하고  사용이 가능합니다.

	// inputState
	// 저장된 값을 의미합니다.

	// closeHandler
	// 취소 버튼에 사용됩니다. 취소 버튼이 없다면 사용하지 않아도 됩니다.

	const renderContent = subComp && React.cloneElement(subComp, {
		setContents: subInputChangeHandler,
		contents: inputState,
		buttons: Buttons.bind(null, submitLabel, closeHandler)//<Buttons closeHandler={closeHandler} noCancel={noCancel} submit={subComp} />
	})

	return (
		<div css={submitWrapperCSS}>
			{renderContent}
		</div>
	)
}



const Buttons = (submitLabel = '작성', closeHandler: any, submit: any) => {
	return (
		<div css={buttonWrapperCSS}>
					{closeHandler &&
					

					<Button
						text={"취소"}
						fontSize={"var(--teacher-h5)"}
						width={"110px"}
						theme={"cancelLight"}
						margin={"0px 8px 0px 0px"}
						onClick={() => {
							closeHandler && closeHandler()
						}}
					/>
					}
					<Button text={`${submitLabel}`} fontSize={"var(--teacher-h5)"} width={"110px"} theme={"highlighted"} onClick={() => {submit()}} />
				</div>
	)
}



const submitWrapperCSS = css`
	width: 100%;
	padding: 8px;
	display: flex;
	justify-content: space-between;
`

const buttonWrapperCSS = css`
	display: flex;
`


export default FormCreator
