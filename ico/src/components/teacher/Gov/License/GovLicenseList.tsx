import React from "react"
import { css } from "@emotion/react"
import { deleteLicenseAPI } from "@/api/teacher/gov/deleteLicenseAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Button from "@/components/common/Button/Button"

type subjectType = {
	id: number
	subject: string
}

function GovLicenseList({ id, subject }: subjectType) {
	const queryClient = useQueryClient()

	const denyMutation = useMutation((idx: number) => deleteLicenseAPI({ idx: idx }))

	const immigrationDenyHandler = () => {
		denyMutation.mutate(id, {
			onSuccess: () => {
				return queryClient.invalidateQueries(["teacher", "govRule"])
			},
		})
	}

	return (
		<div css={subjectWrapperCSS}>
			<div css={subjectCSS}>{subject}</div>
			<div css={spaceCSS}>&nbsp;</div>
			<div css={buttonCSS}>
				<Button
					text={"삭제"}
					fontSize={`var(--teacher-h5)`}
					width={"80px"}
					height={"30px"}
					theme={"warning"}
					onClick={immigrationDenyHandler}
				/>
			</div>
		</div>
	)
}

const subjectWrapperCSS = css`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	align-items: center;
	justify-content: center;

	margin-bottom: 10px;
`

const subjectCSS = css`
	font-size: 20px;
	text-align: center;
`

const spaceCSS = css`
	background-color: #ececec;
	border-radius: 8px;
`

const buttonCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;
`

export default GovLicenseList
