import { css } from "@emotion/react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getLicenseAPI } from "@/api/teacher/gov/getLicenseAPI"
import { getLicenseType } from "@/types/teacher/apiReturnTypes"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { postLicenseAPI } from "@/api/teacher/gov/postLicenseAPI"

import GovLicenseList from "@/components/teacher/Gov/License/GovLicenseList"

function license() {
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getLicenseType[]>(
		["teacher", "govRule"],
		getLicenseAPI,
	)

	const queryClient = useQueryClient()

	const mutation = useMutation((newSubject: string) => postLicenseAPI({ body: { subject: newSubject } }), {
		onSuccess: () => {
			queryClient.invalidateQueries(["teacher", "govRule"])
		},
	})

	const [inputValue, setInputValue] = useState("")

	if (!data) {
		return null
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const handleSubmit = () => {
		mutation.mutate(inputValue)
		setInputValue("")
	}

	return (
		<>
			<div css={contentWrapperCSS}>
				<div css={titleCSS}>자격증 관리</div>
				<div css={descCSS}>학급의 자격증 목록을 관리할 수 있습니다.</div>
				<div css={licenseWrapper}>
					{data.map((item) => (
						<GovLicenseList key={item.id} id={item.id} subject={item.subject} />
					))}
				</div>

				<input type="text" value={inputValue} onChange={handleChange} placeholder="자격증 이름을 입력하세요" />
				<button onClick={handleSubmit}>등록</button>
			</div>
		</>
	)
}

const contentWrapperCSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const titleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: 700;
	margin-bottom: 12px;
	display: flex;
	justify-content: space-between;
	height: 35px;
`

const descCSS = css`
	margin-bottom: 36px;
	font-size: var(--teacher-h5);
`

const licenseWrapper = css`
	border: 1px solid gray;
	border-radius: 30px;
	padding: 30px;

	width: 80%;
`

export default license
