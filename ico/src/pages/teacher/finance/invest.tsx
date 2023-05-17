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

function invest() {
	const queryClient = useQueryClient()
	const createMutation = useMutation((a: number) => deleteInvestAPI())

	const [openDeleteModal, closeDeleteModal, deleteModalState] = useCompHandler()

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getFinanceInvestIssueType>(
		["teacher", "financeInvest"],
		getInvestItemAPI,
	)

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
				<Modal
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
				/>

				<div css={titleCSS}>투자</div>
				<Button
					text={"투자 종목 삭제"}
					fontSize={`var(--teacher-h4)`}
					width={"190px"}
					theme={"normal"}
					onClick={openDeleteModal}
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
