import React from "react"
import Form from "@/components/teacher/common/Form/Form"
import Test from "@/components/teacher/common/Form/Test"
import Test2 from "@/components/teacher/common/Form/Test2"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import TableGenerator from "@/components/teacher/common/TableGenerator/TableGenerator"
import { css } from "@emotion/react"

function index() {
	return (
		<div>
			index
			<Form
				subInit={{ test: "", test2: "" }}
				subInput={<Test />}
				idx={3}
				titlePlaceHolder={"제목을 입력해 주세요!"}
				contentPlaceHolder={"내용을 입력해 주세요!"}
				frontComp={<Test2 />}
			/>
		</div>
	)
}

const tableWrapperCSS = css`
	margin-top: 24px;
`

const contentWrapperCSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

export default index
