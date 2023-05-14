import { css } from "@emotion/react"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ClassStudentDetailMoneyContent from "./ClassStudentDetailMoneyContent"

type ClassStudentDetailMoneyPropsType = {
	refetch: any
}

function ClassStudentDetailMoney({ refetch }: ClassStudentDetailMoneyPropsType) {
	return (
		<div css={contentWrapperCSS}>
			<CollapseMenu
				title={<span>{localStorage.getItem("currency")} 지급 및 차감</span>}
				fontSize={`var(--teacher-h4)`}
				bracketSize={`10px`}
				border={`1px solid #dde3ea`}
			>
				<ClassStudentDetailMoneyContent refetch={refetch} />
			</CollapseMenu>
		</div>
	)
}

const contentWrapperCSS = css`
	margin-top: 30px;
`

export default ClassStudentDetailMoney
