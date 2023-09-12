import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import useGetNation from "@/hooks/useGetNation"

type FinanceDepositStudentListProps = {
	student: {
		number: number
		name: string
		amount: number
		startDate: string
	}
}

function FinanceDepositStudentList({ student }: FinanceDepositStudentListProps) {
	const [nation] = useGetNation()

	return (
		<tr css={trCSS}>
			<td style={{ borderRight: "1px solid #d9d9d9" }}>{student.name}</td>
			<td style={{ borderRight: "1px solid #d9d9d9" }}>
				{student.amount}
				{nation.currency}
			</td>
			<td style={{ borderRight: "1px solid #d9d9d9" }}>{student.number}일 남음</td>
			<td>{student.startDate}</td>
		</tr>
	)
}

const trCSS = css`
	text-align: center;
`

export default FinanceDepositStudentList