import { css } from "@emotion/react"
import ClassStudentDetailAccountList from "./ClassStudentDetailAccountList"
import { useAtomValue } from "jotai"
import { selectedPage, selectedStudent } from "@/store/store"
import { getStudentDetailAPI } from "@/api/teacher/class/getStudentDetailAPI"
import { getStudentDetailType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"
import ClassStudentDetailCertificate from "./ClassStudentDetailCertificate"
import Button from "@/components/common/Button/Button"
import { putReleaseAccountAPI } from "@/api/teacher/class/putReleaseAccountAPI"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { putSuspendAccountAPI } from "@/api/teacher/class/putSuspendAccountAPI"
import useNotification from "@/hooks/useNotification"
import { useEffect } from "react"

function ClassStudentDetail() {
	const noti = useNotification()
	const selectedPageAtom = useAtomValue(selectedPage)
	const selectedStudentAtom = useAtomValue(selectedStudent)
	const { data } = useQuery<getStudentDetailType>(
		["enteredStudentDetail", selectedStudentAtom],
		() => getStudentDetailAPI({ id: selectedStudentAtom, page: selectedPageAtom }),
		// { enabled: false },
	)

	const preventStudentAccount = () => {
		if (data?.frozen === true) {
			putReleaseAccountAPI({ studentId: data.studentId })
				.then(() => {
					noti({
						content: <NotiTemplate type={"ok"} content={`${data?.studentName}의 계좌 정지를 해제하였습니다.`} />,
						duration: 3000,
					})
				})
				.catch(() => {
					noti({
						content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
						duration: 3000,
					})
				})
		} else if (data?.frozen === false) {
			putSuspendAccountAPI({ studentId: data.studentId })
				.then(() => {
					noti({
						content: <NotiTemplate type={"ok"} content={`${data?.studentName}의 계좌를 정지하였습니다.`} />,
						duration: 3000,
					})
				})
				.catch(() => {
					noti({
						content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
						duration: 3000,
					})
				})
		}
	}

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<div css={wrapperCSS}>
			<div css={topWrapperCSS}>
				<ClassStudentDetailAccountList transactions={data?.transactions} size={data?.size} />
				<ClassStudentDetailCertificate license={data?.licenses} />
			</div>
			<div css={bottomWrapperCSS}>
				<Button
					text={data?.frozen ? "계좌 정지 해제" : "계좌 정지"}
					fontSize={`0.9rem`}
					width={data?.frozen ? "130px" : "90px"}
					height={"33px"}
					theme={data?.frozen ? "managePlus" : "manageMinus"}
					margin={"0 10px 0 0"}
					onClick={preventStudentAccount}
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
	align-items: flex-start;
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

export default ClassStudentDetail
