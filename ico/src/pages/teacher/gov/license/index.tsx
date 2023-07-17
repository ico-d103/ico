import { css } from "@emotion/react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getLicenseAPI } from "@/api/teacher/gov/getLicenseAPI"
import { getLicenseType } from "@/types/teacher/apiReturnTypes"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { postLicenseAPI } from "@/api/teacher/gov/postLicenseAPI"

import GovLicenseList from "@/components/teacher/Gov/License/GovLicenseList"

import useGetNation from "@/hooks/useGetNation"

import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"

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

	const [nation] = useGetNation()

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
				<div css={licenseWrapperCSS}>
					<div css={subTitleCSS}>
						{nation.school}&nbsp;{nation.grade}학년&nbsp;{nation.room}반 자격증
					</div>

					{data.map((item) => (
						<GovLicenseList key={item.id} id={item.id} subject={item.subject} />
					))}
				</div>

				<div css={addLicenseWrapperCSS}>
					<div css={inputCSS}>
						<Input
							theme="default"
							width={"400px"}
							onChange={handleChange}
							placeholder="자격증을 입력해 주세요."
						></Input>
					</div>
					<div css={buttonCSS}>
						<Button
							theme={"normal"}
							width={"80px"}
							height={"30px"}
							text={"등록"}
							fontSize={"var(--teacher-h5)"}
							onClick={() => {
								handleSubmit()
							}}
						></Button>
					</div>
				</div>
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

const licenseWrapperCSS = css`
	border: 1px solid #dde3ea;
	border-radius: 20px;
	padding: 30px 0px;

	width: 50%;
`

const subTitleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: 700;
	text-align: center;

	margin-bottom: 30px;
`

const addLicenseWrapperCSS = css`
	border: 1px solid #dde3ea;
	border-radius: 20px;
	padding: 30px 0px;

	width: 50%;

	margin-top: 2%;

	display: grid;
	grid-template-columns: 4fr 1fr;
	align-items: center;
	justify-content: center;
`
const inputCSS = css`
	margin-left: 20px;
`

const buttonCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;
`

export default license
