import React from "react"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import Button from "@/components/common/Button/Button"
import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"
import { css } from "@emotion/react"
import GovExchequerCreate from "@/components/teacher/Gov/Exchequer/GovExchequerCreate"
import GovExchequerDetail from "@/components/teacher/Gov/Exchequer/GovExchequerDetail"
import FormCreator from "@/components/teacher/common/Form/FormCreator"
import { getGovExchequerAPI } from "@/api/teacher/gov/getGovExchequerAPI"
import { getGovExchequerType } from "@/types/teacher/apiReturnTypes"
import { useQuery, useQueryClient } from "@tanstack/react-query"

function index() {
	const [openComp, closeComp, compState] = useCompHandler()

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getGovExchequerType[]>(
		["teacher", "govExchequer"],
		getGovExchequerAPI,
		// { staleTime: 200000 },
	)

	const renderExchequerList = data?.map((el, idx) => {
		return (
			<GovExchequerDetail
				showIdx={idx}
				actualIdx={el.id}
				title={el.title}
				content={el.detail}
				taxAspect={el.type}
				taxValue={el.amount}
			/>
		)
	})


	return (
		<div css={contentWrapperCSS}>
			<div css={titleCSS}>
				세금 관리
				{!compState && (
					<Button
						text={"추가"}
						fontSize={"var(--teacher-h5)"}
						width={"110px"}
						theme={"normal"}
						onClick={() => {
							openComp()
						}}
					/>
				)}
			</div>
			<div css={descCSS}>학급의 세금 납부 목록을 관리할 수 있습니다.</div>

			<FormCreator
				subComp={<GovExchequerCreate />}
				subInit={{ taxation: 0, value: 1 }}
				showIdx={0}
				compState={compState}
				closeComp={closeComp}
			/>

{/* <GovExchequerDetail
				showIdx={0}
				actualIdx={0}
				title={"세금 제목 1"}
				content={"세금 내용입니다. 입섬 로렘..."}
				taxAspect={0}
				taxValue={11}
			/> */}
			{renderExchequerList}
		</div>
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

export default index
