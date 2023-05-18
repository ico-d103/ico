import { css } from "@emotion/react"

function GovRuleGrade() {
	const gradeScore = [
		[900, 1000],
		[870, 899],
		[840, 869],
		[805, 839],
		[750, 804],
		[655, 749],
		[600, 654],
		[517, 599],
		[445, 516],
		[0, 444],
	]

	return (
		<table css={tableCSS}>
			<thead>
				<tr>
					<th></th>
					<th css={thCSS}>최저 점수</th>
					<th css={thCSS}>최고 점수</th>
				</tr>
			</thead>
			<tbody>
				{gradeScore.map((grade, idx) => (
					<tr key={idx}>
						<td css={tdCSS}>{idx + 1} 등급</td>
						<td>{grade[0]} 점</td>
						<td>{grade[1]} 점</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

const tableCSS = css`
	width: 100%;

	td {
		padding: 10px 0;
		text-align: center;
	}
`

const thCSS = css`
	padding: 10px 0;
	border-radius: 20px;
	color: var(--student-main-color-5);
	font-weight: bold;
`

const tdCSS = css`
	color: var(--student-main-color-5);
	font-weight: bold;
`

export default GovRuleGrade
