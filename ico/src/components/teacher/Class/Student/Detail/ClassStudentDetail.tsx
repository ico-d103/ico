import { useEffect, useReducer, useState } from "react"
import { css } from "@emotion/react"
import ClassStudentDetailAccountList from "./ClassStudentDetailAccountList"
import { useAtomValue } from "jotai"
import { selectedStudent } from "@/store/store"
import { getStudentDetailAPI } from "@/api/teacher/class/getStudentDetailAPI"
import { getStudentDetailType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import ClassStudentDetailCertificate from "./ClassStudentDetailCertificate"
import Button from "@/components/common/Button/Button"

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
		<div css={wrapperCSS}>
			<div css={topWrapperCSS}>
				<ClassStudentDetailAccountList transactions={data?.transactions} />
				<ClassStudentDetailCertificate />
			</div>
			<div css={bottomWrapperCSS}>
				<Button
					text={"계좌 정지"}
					fontSize={`0.9rem`}
					width={"90px"}
					height={"33px"}
					theme={"manageMinus"}
					margin={"0 10px 0 0"}
					onClick={() => {}}
				/>
				<Button
					text={"비밀번호 초기화"}
					fontSize={`0.9rem`}
					width={"130px"}
					height={"33px"}
					theme={"manageMinus"}
					margin={"0 10px 0 0"}
					onClick={() => {}}
				/>

				<Button
					text={"자격증 정보 수정"}
					fontSize={`0.9rem`}
					width={"130px"}
					height={"33px"}
					theme={"managePlus"}
					margin={"0 0 0 0"}
					onClick={() => {}}
				/>
			</div>
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

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	padding-bottom: 10px;
`

const topWrapperCSS = css`
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

const bottomWrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
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
