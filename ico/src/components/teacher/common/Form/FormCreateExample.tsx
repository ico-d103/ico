import React from "react"
import FormCreator from "./FormCreator"
import useCompHandler from "@/hooks/useCompHandler"


function FormCreateExample() {
	const [openComp, closeComp, compState] = useCompHandler()

	return (
		<div>
			<button onClick={openComp}>폼 열기</button>
			<FormCreator subComp={<CreateSubForm />} idx={0} compState={compState} closeComp={closeComp} />
		</div>
	)
}

const CreateSubForm = ({
	subInputChangeHandler,
	inputState,
	buttons,
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
}) => {
	// subInputChangeHandler({key: 키값, value: 내용})
	// subInputChangeHandler({key: 키값, event: input 태그의 onChange에 사용할 경우})
	// inputState : 저장된 내용
	// 취소, 제출 버튼

	const submit = () => {
		// 제출
	}

	return (
		<React.Fragment>
			<div></div>
			{buttons(submit)}
		</React.Fragment>
	)
}

export default FormCreateExample
