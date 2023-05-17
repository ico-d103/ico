import React, { useRef, useState } from "react"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import alertTriangle from "react-useanimations/lib/alertTriangle"
import { css } from "@emotion/react"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import Input from "@/components/common/Input/Input"
import { CLIP_ICON } from "@/components/teacher/Signup/SignupIcons/SignupIcons"
import Button from "@/components/common/Button/Button"
import { postCertificationAPI } from "@/api/teacher/user/postCertificationAPI"
import { useSetAtom, useAtom } from "jotai"
import { nationData, tokenStatus } from "@/store/store"

function cert() {
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
	const [fileUrl, setFileUrl] = useState<string>("")
	const [file, setFile] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [rePost, setRePost] = useState<boolean>(false)
    const [tokenStatusAtom, setTokenStatusAtom] = useAtom(tokenStatus)

	const renderFileInputUrl = (
		<div css={inputFileCSS({ fileUrl })}>
			{CLIP_ICON}
			{fileUrl ? fileUrl : "교사 인증서를 첨부해 주세요."}
		</div>
	)

	const inputFileOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setFile(() => file)
			setFileUrl(() => file.name)
		}
	}

	const submitHandler = () => {
		const formData = new FormData()
		file && formData.append("file", file)
		postCertificationAPI({ body: formData }).then((res) => {
			setTokenStatusAtom(() => {return {role: 'TEACHER', status: 'require_approval', showMessage: false}})
		})
	}

	const renderInput = (
		<div css={inputWrapperCSS}>
			<Input
				leftContent={renderFileInputUrl}
				rightContent={
					<Button
						theme={"RadialPositive"}
						width={"120px"}
						height={"42px"}
						text={"파일 첨부"}
						fontSize={"var(--teacher-h5)"}
						onClick={() => {
							fileInputRef?.current?.click()
						}}
					></Button>
				}
				onChange={inputFileOnChangeHandler}
				theme={"default"}
				customCss={inputCSS}
				type="file"
				placeholder="교사 인증서"
				isFile={true}
				ref={fileInputRef}
			/>
			<Button
				theme={"highlighted"}
				width={"140px"}
				height={"42px"}
				text={"제출"}
				fontSize={"var(--teacher-h4)"}
				onClick={submitHandler}
				cssProps={css`
					outline: 2px solid var(--teacher-highlight-color);
					margin-left: 16px;
				`}
			></Button>
		</div>
	)

	return (
		<div css={wrapperCSS}>
			{getTokenStatus.status === "require_approval" && (
				<div css={contentWrapperCSS}>
					<UseAnimations animation={alertCircle} size={256} />
					<div css={successLabelCSS}>교사 인증서 승인 대기중입니다.</div>
					<div css={successSubLabelCSS}>인증 완료 시, 문자가 발송됩니다!</div>
					{!rePost && (
						<Button
							theme={"highlighted"}
							width={"140px"}
							height={"42px"}
							text={"다시 제출"}
							fontSize={"var(--teacher-h4)"}
							onClick={() => {
								setRePost(() => true)
							}}
							cssProps={css`
								margin-top: 36px;
							`}
						></Button>
					)}
				</div>
			)}

			{getTokenStatus.status === "require_submit_certification" && (
				<div css={contentWrapperCSS}>
					<UseAnimations animation={alertTriangle} size={256} />
					<div css={successLabelCSS}>교사 인증서 승인이 거절되었습니다.</div>
					<div css={successSubLabelCSS}>서비스를 이용하기 위해서는 유효한 인증서를 제출해야 합니다.</div>
				</div>
			)}

			{(getTokenStatus.status === "require_submit_certification" || rePost) && renderInput}
		</div>
	)
}

const wrapperCSS = css`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const successLabelCSS = css`
	font-size: 36px;
	margin-bottom: 24px;
`

const successSubLabelCSS = css`
	font-size: 24px;
`

const inputFileCSS = ({ fileUrl }: { fileUrl: string }) => {
	return css`
		display: flex;
		align-items: center;
		gap: 12px;
		color: ${fileUrl ? "rgba(0, 20, 50, 1)" : "rgba(0, 20, 50, 0.5)"};
		overflow: hidden;
		white-space: nowrap;
		width: 100%;
		font-size: var(--teacher-h5);
	`
}

const inputCSS = css`
	flex: 1;
`
const inputWrapperCSS = css`
	margin-top: 36px;
	width: 580px;
	display: flex;
`

export default cert
