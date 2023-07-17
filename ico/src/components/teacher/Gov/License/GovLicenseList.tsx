import React from "react"
import { css } from "@emotion/react"
import { deleteLicenseAPI } from "@/api/teacher/gov/deleteLicenseAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Button from "@/components/common/Button/Button"

type AType = {
	id: number
	subject: string
}

function GovLicenseList({ id, subject }: AType) {
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
			<Button
				text={"삭제"}
				fontSize={`var(--teacher-h5)`}
				width={"80px"}
				height={"30px"}
				theme={"warning"}
				onClick={immigrationDenyHandler}
			/>
		</div>
	)
}

const subjectWrapperCSS = css`
	flex: 1;
`

const subjectCSS = css`
	font-size: 30px;
`

export default GovLicenseList
