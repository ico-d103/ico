import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import FinanceInvestStartForm from "@/components/teacher/Finance/Legacy/FinanceInvestStartForm"
// import FinanceInvestIssueForm from "@/components/teacher/Finance/Invest/FinanceInvestIssueForm"
import useGetNation from "@/hooks/useGetNation"
import { deleteInvestAPI } from "@/api/teacher/finanace/deleteInvestAPI"
import { getInvestItemAPI } from "@/api/teacher/finanace/getInvestItemAPI"
import { useQuery } from "@tanstack/react-query"
import { getFinanceInvestIssueType } from "@/types/teacher/apiReturnTypes"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import ModalAlert from "@/components/common/Modal/ModalAlert"
import useModal from "@/components/common/Modal/useModal"

import { getInvestListAPI } from "@/api/teacher/finanace/getInvestListAPI"
import { investListType } from "@/types/teacher/apiReturnTypes"

import FinanceInvestList from "@/components/teacher/Finance/Invest/FinanceInvestList"
import { putInvestItemAPI } from "@/api/teacher/finanace/putInvestItemAPI"

import Input from "@/components/common/Input/Input"

import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"
import FinanceInvestCreate from "@/components/teacher/Finance/Invest/FinanceInvestCreate"

import FinanceInvestTradingTime from "@/components/teacher/Finance/Invest/FinanceInvestTradingTime"
import { getInvestTimeAPI } from "@/api/teacher/finanace/getInvestTimeAPI"
import { investTimeType } from "@/types/teacher/apiReturnTypes"

function invest() {
	const [openComp, closeComp, compState] = useCompHandler()

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<investListType[]>(
		["teacher", "financeInvest"],
		getInvestListAPI,
	)

	const { data: timeData } = useQuery<investTimeType>(["teacher", "financeTimeInvest"], getInvestTimeAPI)

	const tradingStart = timeData?.tradingStart
	const tradingEnd = timeData?.tradingEnd

	if (!data) {
		return null
	}

	if (!timeData) {
		return null
	}

	return (
		<div css={wrapperCSS}>
			<div css={titleCSS}>
				투자
				{!compState && (
					<Button
						text={"투자 상품 추가하기"}
						fontSize={"var(--teacher-h5)"}
						width={"200px"}
						theme={"normal"}
						onClick={() => {
							openComp()
						}}
					/>
				)}
			</div>
			<div css={subTitleCSS}>투자 종목 설정을 설정하고 이슈를 등록해 투자 상품을 관리할 수 있습니다.</div>

			<div css={tradingTimeCSS}>
				<FinanceInvestTradingTime tradingStart={tradingStart} tradingEnd={tradingEnd} />
			</div>

			<div>
				<AnimatedRenderer compState={compState} initHeight="0">
					<FinanceInvestCreate closeHandler={closeComp} />
				</AnimatedRenderer>
			</div>

			<div>
				{data.map((item) => (
					<FinanceInvestList key={item.id} data={item} id={item.id} />
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
	margin-bottom: 30px;
`

const tradingTimeCSS = css`
	padding: 20px;
	color: white;
	background-color: var(--teacher-main-color-2);

	border-radius: 20px;
`

export default invest
