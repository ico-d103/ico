import { css } from "@emotion/react"

function GovRuleGrade() {
	const gradeScore = [
		[901, 1000],
		[801, 900],
		[701, 800],
		[601, 700],
		[501, 600],
		[401, 500],
		[301, 400],
		[201, 300],
		[101, 200],
		[0, 100],
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
