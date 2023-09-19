import React, { useState } from "react"
import Button from "@/components/common/Button/Button"
import { css } from "@emotion/react"

import { useQuery } from "@tanstack/react-query"

import useCompHandler from "@/hooks/useCompHandler"

import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"

import FinanceSavingCreate from "@/components/teacher/Finance/Saving/FinanceSavingCreate"

import { getSavingListAPI } from "@/api/teacher/finance/getSavingListAPI"

import { savingListType } from "@/types/teacher/apiReturnTypes"
import FinanceSavingList from "@/components/teacher/Finance/Saving/FinanceSavingList"

function saving() {
	const [openComp, closeComp, compState] = useCompHandler()

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<savingListType[]>(
		["teacher", "financeSaving"],
		getSavingListAPI,
	)

	if (!data) {
		return null
	}

	return (
		<div css={wrapperCSS}>
			<div css={titleCSS}>
				적금
				{!compState && (
					<Button
						text={"적금 상품 추가하기"}
						fontSize={"var(--teacher-h5)"}
						width={"200px"}
						theme={"normal"}
						onClick={() => {
							openComp()
						}}
					/>
				)}
			</div>
			<div css={subTitleCSS}>적금 상품을 만들고 신용등급에 따른 적금 이자율을 설정할 수 있습니다.</div>

			<div>
				<AnimatedRenderer compState={compState} initHeight="0">
					<FinanceSavingCreate closeHandler={closeComp} />
				</AnimatedRenderer>
			</div>

			<div>
				{data.map((item) => (
					<FinanceSavingList key={item.id} data={item} />
				))}
			</div>
		</div>
	)
}

const wrapperCSS = css`
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

const subTitleCSS = css`
	font-size: 0.95rem;
	margin-top: 12px;
	margin-bottom: 36px;
`

export default saving
