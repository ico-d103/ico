import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

function ClassStudentManageGrade() {
	return (
		<>
			<span css={spanCSS}>신용 점수를</span>
			<Button
				text={"올릴게요"}
				fontSize={`var(--teacher-h6)`}
				width={"80px"}
				height={"30px"}
				theme={"managePlus"}
				margin={"0 10px 0 0"}
				onClick={(e) => e.stopPropagation()}
			/>
			<Button
				text={"내릴게요"}
				fontSize={`var(--teacher-h6)`}
				width={"80px"}
				height={"30px"}
				theme={"manageMinus"}
				onClick={(e) => e.stopPropagation()}
			/>
		</>
	)
}

const spanCSS = css`
	font-size: var(--teacher-h5);
	color: var(--teacher-gray-color);
	margin-right: 15px;
`

export default ClassStudentManageGrade
