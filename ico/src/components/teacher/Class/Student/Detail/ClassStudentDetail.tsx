import { css } from "@emotion/react"
import ClassStudentDetailAccountList from "./ClassStudentDetailAccountList"
import { useAtomValue } from "jotai"
import { selectedPage, selectedStudent } from "@/store/store"
import { getStudentDetailAPI } from "@/api/teacher/class/getStudentDetailAPI"
import { getStudentDetailType } from "@/types/teacher/apiReturnTypes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ClassStudentDetailCertificate from "./ClassStudentDetailCertificate"
import Button from "@/components/common/Button/Button"
import { putReleaseAccountAPI } from "@/api/teacher/class/putReleaseAccountAPI"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { putSuspendAccountAPI } from "@/api/teacher/class/putSuspendAccountAPI"
import useNotification from "@/hooks/useNotification"
import { useEffect, useState } from "react"
import { putResetStudentPWAPI } from "@/api/teacher/class/putResetStudentPWAPI"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import ModalContent from "@/components/common/Modal/ModalContent"
import { modifiedStudentLicenseInfo } from "@/store/store"
import { putStudentLicenseAPI } from "@/api/teacher/class/putStudentLicenseAPI"

function ClassStudentDetail() {
	const noti = useNotification()
	const selectedPageAtom = useAtomValue(selectedPage)
	const selectedStudentAtom = useAtomValue(selectedStudent)
	const { data } = useQuery<getStudentDetailType>(
		["enteredStudentDetail", selectedStudentAtom],
		() => getStudentDetailAPI({ id: selectedStudentAtom, page: selectedPageAtom }),
		// { enabled: false },
	)
	const queryClient = useQueryClient()
	const putReleaseAccountMutation = useMutation((params: { studentId: number }) => putReleaseAccountAPI(params))
	const putSuspendAccountMutation = useMutation((params: { studentId: number }) => putSuspendAccountAPI(params))

	const [openComp, closeComp, compState] = useCompHandler()
	const [newPW, setNewPW] = useState<string>("")
	const modifiedStudentLicenseInfoAtom = useAtomValue(modifiedStudentLicenseInfo)

	const preventStudentAccountHandler = () => {
		if (data?.frozen === true) {
			const result = confirm(`${data?.studentName} 학생의 계좌정지를 해제하시겠습니까?`)

			if (result) {
				putReleaseAccountMutation.mutate(
					{ studentId: data.studentId },
					{
						onSuccess: () => {
							noti({
								content: <NotiTemplate type={"ok"} content={`${data?.studentName}의 계좌 정지를 해제하였습니다.`} />,
								duration: 3000,
							})

							queryClient.invalidateQueries(["enteredStudentDetail", selectedStudentAtom])
						},
						onError: () => [
							noti({
								content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
								duration: 3000,
							}),
						],
					},
				)
			}
		} else if (data?.frozen === false) {
			const result = confirm(`${data?.studentName} 학생의 계좌를 정지하시겠습니까?`)

			if (result) {
				putSuspendAccountMutation.mutate(
					{ studentId: data.studentId },
					{
						onSuccess: () => {
							noti({
								content: <NotiTemplate type={"ok"} content={`${data?.studentName}의 계좌를 정지하였습니다.`} />,
								duration: 3000,
							})

							queryClient.invalidateQueries(["enteredStudentDetail", selectedStudentAtom])
						},
						onError: () => [
							noti({
								content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
								duration: 3000,
							}),
						],
					},
				)
			}
		}
	}

	const resetStudentPWHandler = () => {
		const result = confirm(`${data?.studentName} 학생의 비밀번호를 초기화하시겠습니까?`)

		if (result && data?.studentId) {
			putResetStudentPWAPI({ studentId: data.studentId }).then((res) => {
				// res : 새로발급받은 비밀번호
				// res를 modal로 띄어야 함
				setNewPW(res)
				openComp()
			})
		}
	}

	const copyNewPWHandler = async () => {
		try {
			await navigator.clipboard.writeText(newPW)

			noti({
				content: <NotiTemplate type={"ok"} content={`클립보드에 복사되었습니다.`} />,
				duration: 2000,
			})
		} catch (error) {
			noti({
				content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
				duration: 2000,
			})
		}
	}

	const modifyStudentLicenseHandler = () => {
		if (data?.studentId) {
			putStudentLicenseAPI({ studentId: data.studentId })
				.then(() => {
					noti({
						content: <NotiTemplate type={"ok"} content={`자격증 정보를 수정하였습니다.`} />,
						duration: 2000,
					})
				})
				.catch(() => {
					noti({
						content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
						duration: 2000,
					})
				})
		}
	}

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<>
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
						onClick={preventStudentAccountHandler}
					/>
					<Button
						text={"비밀번호 초기화"}
						fontSize={`0.9rem`}
						width={"130px"}
						height={"33px"}
						theme={"manageMinus"}
						margin={"0 10px 0 0"}
						onClick={resetStudentPWHandler}
					/>

					<Button
						text={"자격증 정보 수정"}
						fontSize={`0.9rem`}
						width={"130px"}
						height={"33px"}
						theme={"managePlus"}
						margin={"0 0 0 0"}
						onClick={modifyStudentLicenseHandler}
					/>
				</div>
			</div>
			<Modal
				compState={compState}
				closeComp={closeComp}
				transition={"scale"}
				content={
					<ModalContent
						width={"500px"}
						icon={
							<svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12 8V12M12 16H12.01M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
									stroke="#D94A4A"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						}
						title={"비밀번호 초기화 성공"}
						titleSize={"var(--teacher-h2)"}
						content={
							<div css={modalContentCSS}>
								<span>
									{data?.studentName} 학생에게 새로운 비밀번호 <b>{newPW}</b>를 알려주세요
								</span>
								<small>※ 이 창을 닫으시면 다시 비밀번호를 확인할 수 없습니다.</small>
								<Button
									text={"비밀번호 복사"}
									fontSize={"var(--teacher-h5)"}
									width={"200px"}
									theme={"manageMinus"}
									onClick={copyNewPWHandler}
								/>
							</div>
						}
					/>
				}
			/>
		</>
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

const modalContentCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;

	> span > b {
		font-weight: bold;
	}

	> small {
		font-size: var(--teacher-h5);
		color: #d94a4a;
	}
`

export default ClassStudentDetail
