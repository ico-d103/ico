import { css } from "@emotion/react"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ClassStudentDetailMoneyContent from "./ClassStudentDetailMoneyContent"
import useGetNation from "@/hooks/useGetNation"

type ClassStudentDetailMoneyPropsType = {
	refetch: any
}

function ClassStudentDetailMoney({ refetch }: ClassStudentDetailMoneyPropsType) {
	const [nation] = useGetNation()

	return (
		<div css={contentWrapperCSS}>
			<CollapseMenu
				title={<span>{nation.currency} 지급 및 차감</span>}
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
