import React, { useEffect, useReducer, useState } from "react"
import { css } from "@emotion/react"
import ClassStudentDetailHead from "./ClassStudentDetailHead"
import ClassStudentDetailMoney from "./ClassStudentDetailMoney"
import ClassStudentDetailGrade from "./ClassStudentDetailGrade"
import ClassStudentDetailAccountList from "./ClassStudentDetailAccountList"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"
import { getStudentDetailAPI } from "@/api/teacher/class/getStudentDetailAPI"
import { getStudentDetailType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import ClassStudentDetailCertificate from "./ClassStudentDetailCertificate"

function ClassStudentDetail() {
	const selectedStudentAtom = useAtomValue(selectedStudent)

	const { data, refetch } = useQuery<getStudentDetailType>(
		["enteredStudentDetail", selectedStudentAtom],
		() => getStudentDetailAPI({ id: selectedStudentAtom }),
		// { enabled: false },
	)

	useEffect(() => {
		console.log(selectedStudentAtom, data)
		// if (selectedStudentAtom !== -1) {
		// 	refetch()
		// }
	}, [selectedStudentAtom])

	return (
		<div css={contentChildrenCSS}>
			<ClassStudentDetailAccountList transactions={data?.transactions} />
			<ClassStudentDetailCertificate />
		</div>
		// <>
		// 	{selectedStudentAtom === -1 ? (
		// 		<div css={wrapperCSS}>
		// 			<h1>관리할 학생을 선택해주세요.</h1>
		// 		</div>
		// 	) : (
		// 		data && (
		// 			<React.Fragment key={`studentDetail-${selectedStudentAtom}`}>
		// 				<h1 css={headerCSS}>학생 정보 상세보기</h1>
		// 				<ClassStudentDetailHead studentName={data.studentName} frozen={data.frozen} />
		// 				<ClassStudentDetailMoney refetch={refetch} />
		// 				<ClassStudentDetailGrade creditScore={data.creditScore} refetch={refetch} />
		// 				<ClassStudentDetailAccountList transactions={data.transactions} />
		// 			</React.Fragment>
		// 		)
		// 	)}
		// </>
	)
}

export async function getServerSideProps() {
	return {
		props: {},
	}
}

const contentChildrenCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 30px;

	> div:nth-of-type(1) {
		width: 45%;
	}

	> div:nth-of-type(2) {
		width: 55%;
	}
`

// const wrapperCSS = css`
// 	height: 100%;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;

// 	> h1 {
// 		font-size: var(--teacher-h2);
// 		color: var(--teacher-gray-color);
// 	}
// `

// const headerCSS = css`
// 	font-size: var(--teacher-h1);
// 	font-weight: bold;
// `

export default ClassStudentDetail
