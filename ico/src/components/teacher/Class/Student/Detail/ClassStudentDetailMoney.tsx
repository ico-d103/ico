import { css } from "@emotion/react"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ClassStudentDetailMoneyContent from "./ClassStudentDetailMoneyContent"

function ClassStudentDetailMoney() {
	return (
		<div css={contentWrapperCSS}>
			<CollapseMenu
				title={<span>미소 지급 및 차감</span>}
				fontSize={`var(--teacher-h4)`}
				bracketSize={`10px`}
				border={`1px solid #dde3ea`}
			>
				<ClassStudentDetailMoneyContent />
			</CollapseMenu>
		</div>
	)
}

const contentWrapperCSS = css`
	margin-top: 30px;
`

export default ClassStudentDetailMoney
