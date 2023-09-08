import React, { useEffect } from "react"
import { css } from "@emotion/react"
import Form from "../../common/Form/Form"

import GovRuleClassDetail from "./GovRuleClassDetail"

import Button from "@/components/common/Button/Button"
import useCompHandler from "@/hooks/useCompHandler"
import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"
import FormCreator from "../../common/Form/FormCreator"
import GoveRuleClassCreate from "./GovRuleClassCreate"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getGovRuleAPI } from "@/api/teacher/gov/getGovRuleAPI"
import { getGovRuleType } from "@/types/teacher/apiReturnTypes"
import { dateFormatter } from "@/util/dateFormatter"

function GovRuleClass() {
	const [openComp, closeComp, compState] = useCompHandler()

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getGovRuleType[]>(
		["teacher", "govRule"],
		getGovRuleAPI,
		// { staleTime: 200000 },
	)

	const renderRule =
		data &&
		data.map((el, idx) => {
			const date = dateFormatter(el.dateTime)

			return <GovRuleClassDetail showIdx={idx + 1} actualIdx={el.id} title={el.title} content={el.detail} date={date} />
		})

	const rule = `
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...학급 규칙 내용입니다. 입섬 로렘...학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    v
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    v
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    학급 규칙 내용입니다. 입섬 로렘...
    `

	return (
		<div css={contentWrapperCSS}>
			<div css={titleCSS}>
				학급 규칙
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
			<div css={descCSS}>학급의 규칙을 작성하거나 수정할 수 있습니다.</div>

			{/* <Form
				mainInit={{ title: "zzzz", content: "hahaha" }}
				subInit={{ test: "", test2: "" }}
				subInput={<Test />}
				idx={3}
				titlePlaceHolder={"제목을 입력해 주세요!"}
				contentPlaceHolder={"내용을 입력해 주세요!"}
			/> */}

			<FormCreator
				subComp={<GoveRuleClassCreate />}
				showIdx={dateFormatter.length}
				compState={compState}
				closeComp={closeComp}
			/>
			{/* <FormCreator subComp={<CreateRule />} idx={0} compState={compState} /> */}

			{renderRule}
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
`
export default GovRuleClass
