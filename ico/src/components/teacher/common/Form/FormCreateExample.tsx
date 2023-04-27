import React from "react"
import FormCreator from "./FormCreator"
import useCompHandler from "@/hooks/useCompHandler"

function FormCreateExample() {
	const [openComp, closeComp, compState] = useCompHandler()

	return (
		<div>
            <button onClick={openComp}>폼 열기</button>
			<FormCreator subComp={<CreateSubForm />} idx={0} compState={compState} closeCompHandler={closeComp} />
		</div>
	)
}

const CreateSubForm = ({ updateContents, contents, buttons }: { updateContents?: any; contents?: any; buttons?: any }) => {
    // updateContents({key: 키값, value: 내용})
    // updateContents({key: 키값, event: input 태그의 onChange에 사용할 경우})
    // contents : 저장된 내용
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
