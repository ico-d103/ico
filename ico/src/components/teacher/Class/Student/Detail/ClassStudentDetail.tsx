import React, { useEffect, useReducer, useState } from "react"
import { css } from "@emotion/react"
import ClassStudentDetailHead from "./ClassStudentDetailHead"
import ClassStudentDetailMoney from "./ClassStudentDetailMoney"
import ClassStudentDetailGrade from "./ClassStudentDetailGrade"
import ClassStudentDetailAccountList from "./ClassStudentDetailAccountList"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"
import { getStudentDetailAPI } from "@/api/teacher/class/getStudentDetailAPI"
import { getStudentDetailType, transactionsType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"

// const studentReducer = (
// 	state: {
// 		studentId: number
// 		studentName: string
// 		creditScore: number
// 		transactions: transactionsType
// 		frozen: boolean
// 	},
// 	action: {
// 		type: string
// 		value: {
// 			studentId: number
// 			studentName: string
// 			creditScore: number
// 			transactions: transactionsType
// 			frozen: boolean
// 		}
// 	},
// ) => {
// 	switch (action.type) {
// 		case "CHANGE_STATE":
// 			return action.value
// 		default:
// 			return state
// 	}
// }

function StudentDetail() {
	const [isEnabled, setIsEnabled] = useState<boolean>(false)
	const selectedStudentAtom = useAtomValue(selectedStudent)
	// const [studentState, dispatchStudent] = useReducer(studentReducer, {
	// 	studentId: -1,
	// 	studentName: "",
	// 	creditScore: -1,
	// 	transactions: {},
	// 	frozen: false,
	// })

	const { data, refetch } = useQuery<getStudentDetailType>(
		["enteredStudentDetail", selectedStudentAtom],
		() => getStudentDetailAPI({ id: selectedStudentAtom }),
		{ enabled: false },
	)

	useEffect(() => {
		if (selectedStudentAtom !== -1) {
			// setIsEnabled(true)
			refetch()
		}
	}, [selectedStudentAtom])

	// useEffect(() => {
	// 	if (data !== undefined) {
	// 		dispatchStudent({ type: "CHANGE_STATE", value: data })
	// 		setIsEnabled(false)
	// 	}
	// }, [data])

	return (
		<>
			{selectedStudentAtom === -1 ? (
				<div css={wrapperCSS}>
					<h1>관리할 학생을 선택해주세요.</h1>
				</div>
			) : (
				data && (
					<React.Fragment key={`studentDetail-${selectedStudentAtom}`}>
						<h1 css={headerCSS}>학생 정보 상세보기</h1>
						<ClassStudentDetailHead studentName={data.studentName} frozen={data.frozen} />
						<ClassStudentDetailMoney />
						<ClassStudentDetailGrade creditScore={data.creditScore} />
						<ClassStudentDetailAccountList transactions={data.transactions} />
					</React.Fragment>
				)
			)}
		</>
	)
}

const wrapperCSS = css`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	> h1 {
		font-size: var(--teacher-h2);
		color: var(--teacher-gray-color);
	}
`

const headerCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
`

export default StudentDetail
