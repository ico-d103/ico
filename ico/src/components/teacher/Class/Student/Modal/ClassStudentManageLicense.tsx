import { css } from "@emotion/react"
import ClassStudentDetailCertificateItem from "../Detail/ClassStudentDetailCertificateItem"
import Button from "@/components/common/Button/Button"
import { useAtomValue } from "jotai"
import { checkedStudent, modifiedStudentLicenseInfo } from "@/store/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { putStudentsLicenseAPI } from "@/api/teacher/class/putStudentsLicenseAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { studentLicenseBodyType } from "@/types/teacher/apiReturnTypes"

type ClassStudentManageLicenseProps = {
	license: {
		id: number
		subject: string
		rating: number
	}[]
}

function ClassStudentManageLicense({ license }: ClassStudentManageLicenseProps) {
	const noti = useNotification()
	const queryClient = useQueryClient()
	const checkedStudentAtom = useAtomValue(checkedStudent)
	const modifiedStudentLicenseInfoAtom = useAtomValue(modifiedStudentLicenseInfo)
	const putStudentsLicenseMutation = useMutation(
		(args: { body: { studentIds: number[]; license: studentLicenseBodyType[] } }) => putStudentsLicenseAPI(args),
	)
	const manageStudentsLicenseHandler = () => {
		const bodyStudentIds = checkedStudentAtom.map((item) => parseInt(Object.keys(item)[0]))
		const bodyLicense = Object.entries(modifiedStudentLicenseInfoAtom).map(([key, value]) => ({ [key]: value }))
		const args = { body: { studentIds: bodyStudentIds, license: bodyLicense } }

		putStudentsLicenseMutation.mutate(args, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={"성공적으로 수정되었습니다."} />,
					duration: 2000,
				})

				bodyStudentIds.forEach((id) => {
					queryClient.invalidateQueries(["enteredStudentDetail", id])
				})
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 2000,
				})
			},
		})
	}

	return (
		<div css={wrapperCSS}>
			{license.length ? (
				<>
					<div>
						{license.map((el) => (
							<ClassStudentDetailCertificateItem key={el.id} certificate={el} />
						))}
					</div>
					<Button
						text={"자격증 정보 수정"}
						fontSize={`0.9rem`}
						width={"130px"}
						height={"33px"}
						theme={"managePlus"}
						margin={"0 0 0 0"}
						onClick={manageStudentsLicenseHandler}
					/>
				</>
			) : (
				<div css={noneListWrapperCSS}>
					<span>자격증이 없습니다.</span>
				</div>
			)}
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	margin-top: 20px;

	> div {
		width: 90%;
		height: 230px;
		overflow: scroll;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`

const noneListWrapperCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;

	> span {
		font-size: var(--teacher-h5);
	}
`

export default ClassStudentManageLicense
