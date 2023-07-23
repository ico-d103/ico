import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import FinanceInvestStartForm from "@/components/teacher/Finance/Invest/FinanceInvestStartForm"
import FinanceInvestIssueForm from "@/components/teacher/Finance/Invest/FinanceInvestIssueForm"
import useGetNation from "@/hooks/useGetNation"
import { deleteInvestAPI } from "@/api/teacher/finanace/deleteInvestAPI"
import { getInvestItemAPI } from "@/api/teacher/finanace/getInvestItemAPI"
import { useQuery } from "@tanstack/react-query"
import { getFinanceInvestIssueType } from "@/types/student/apiReturnTypes"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import ModalAlert from "@/components/common/Modal/ModalAlert"
import useModal from "@/components/common/Modal/useModal"

function invest() {
	const queryClient = useQueryClient()
	const createMutation = useMutation((a: number) => deleteInvestAPI())

	// const [openDeleteModal, closeDeleteModal, deleteModalState] = useCompHandler()
	const modal = useModal()

	// const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getFinanceInvestIssueType>(
	// 	["teacher", "financeInvest"],
	// 	getInvestItemAPI,
	// )

	type getFinanceInvestIssueType = {
		stock: string
		tradingStart: string
		tradingEnd: string
		issue: {
			date: string
			amount: number
			content: string
		}[]
	}

	const data: getFinanceInvestIssueType = {
		stock: '조선시대 역사',
    tradingStart: '10:30',
    tradingEnd: '14:30',
		issue: [
			{
				 date: '2023.05.18',
				 amount: 318,
				 content: '임진왜란이 끝나면서 이순신 장군은 어떻게 되었을까요?',
			},
			{
				 date: '2023.05.17',
				 amount: 418,
				 content: '1598년 어떤 일이 일어났을까요?',
			},
			{
				 date: '2023.05.16',
				 amount: 216,
				 content: '1592년, 임진왜란이 발발했어요. 과연 조선의 국운은 어떻게 흘러갈까요?',
			},
			{
				 date: '2023.05.15',
				 amount: 439,
				 content: '1504년, 갑자사화가 발발했어요. 이 사건으로 조선의 부정부패가 사라지고 더 발전했을까요? 아니면 더 퇴보했을까요?',
			},
			{
				 date: '2023.05.14',
				 amount: 592,
				 content: '1446년, 훈민정음이 반포되었어요.',
			},
			{
			date: '2023.05.13',
			amount: 375,
			content: '1418년 8월, 지금까지도 큰 영향을 미치고 있는 인물이 왕이 되요.',
	 },
	 {
			date: '2023.05.12',
			amount: 171,
			content: '1408년 5월, 태조 이성계에게 무슨 일이 일어났을까요?',
	 },
	 {
			date: '2023.05.11',
			amount: 247,
			content: '1392년, 태조 이성계가 조선을 건국했어요.',
	 },
	 {
			date: '2023.05.10',
			amount: 100,
			content: '이성계가 위화도 회군을 했어요.',
	 }
]

	}



	const deleteInvest = () => {
		createMutation.mutate(1, {
			onSuccess: () => {
				queryClient.removeQueries(["teacher", "financeInvest"])
				return queryClient.invalidateQueries(["teacher", "financeInvest"])
			},
		})
	}

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				{/* <Modal
					compState={deleteModalState}
					closeComp={closeDeleteModal}
					transition={"scale"}
					content={
						<ModalAlert
							title={"투자 종목을 삭제합니다."}
							titleSize={"var(--teacher-h2)"}
							proceed={deleteInvest}
							width={"480px"}
							content={[
								"작성한 모든 이슈가 삭제됩니다.",
								"학생들이 보유한 모든 주식이 최근 이슈의 가격으로 전체 매도됩니다.",
							]}
						/>
					}
				/> */}
				{modal(
					<ModalAlert
					title={"투자 종목을 삭제합니다."}
					titleSize={"var(--teacher-h2)"}
					proceed={deleteInvest}
					width={"480px"}
					content={[
						"작성한 모든 이슈가 삭제됩니다.",
						"학생들이 보유한 모든 주식이 최근 이슈의 가격으로 전체 매도됩니다.",
					]}
				/>
				)}

				<div css={titleCSS}>투자</div>
				<Button
					text={"투자 종목 삭제"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={modal.open}
				/>
			</div>
			<div css={subTitleCSS}>투자 종목 설정을 설정하고 이슈를 등록해 투자 상품을 관리할 수 있습니다.</div>
			{!data && <FinanceInvestStartForm />}
			{data && <FinanceInvestIssueForm data={data} />}
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`
const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const titleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
`

const subTitleCSS = css`
	font-size: 0.95rem;
	margin-top: 12px;
	margin-bottom: 30px;
`

export default invest
