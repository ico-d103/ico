import React from "react"
import { productTypeForDeposit, productTypeForSaving } from "@/types/student/apiReturnTypes"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import Modal from "@/components/common/Modal/Modal"
import ModalContent from "@/components/common/Modal/ModalContent"
import FinanceDepositApplyModal from "./Modal/FinanceDepositApplyModal"
import useCompHandler from "@/hooks/useCompHandler"
import useGetNation from "@/hooks/useGetNation"
import useModal from "@/components/common/Modal/useModal"
import FinanceSavingApplyModal from "./Modal/FinanceSavingApplyModal"
import { appendEulReul } from "@/util/isEndWithConsonant"

const APPLY_ICON = (
	<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M24.9993 29V17M18.9992 23H30.9993M24.9993 40C34.3881 40 41.9992 32.3888 41.9992 23C41.9992 13.6112 34.3881 6 24.9993 6C15.6104 6 7.99925 13.6112 7.99925 23C7.99925 24.9 8.31094 26.7272 8.88599 28.4332C9.10239 29.0752 9.21059 29.3962 9.2301 29.6429C9.24938 29.8864 9.23481 30.0571 9.17456 30.2939C9.11354 30.5336 8.97884 30.783 8.70944 31.2816L5.43812 37.3367C4.9715 38.2004 4.73819 38.6323 4.79041 38.9655C4.83589 39.2558 5.00674 39.5115 5.2576 39.6645C5.5456 39.8402 6.03385 39.7897 7.01033 39.6887L17.2524 38.63C17.5625 38.598 17.7176 38.5819 17.859 38.5873C17.998 38.5927 18.0961 38.6057 18.2317 38.637C18.3696 38.6687 18.5429 38.7355 18.8896 38.8691C20.7857 39.5996 22.8457 40 24.9993 40Z"
			stroke="black"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

type FinanceListProductProps = {
	data: productTypeForDeposit
	type: 'deposit'
	account: number
} | {
	data: productTypeForSaving
	type: 'saving'
	account: number
}

function FinanceListProduct({ data, account, type }: FinanceListProductProps) {
	// const [openComp, closeComp, compState] = useCompHandler()
	const modal = useModal()
	const [nation] = useGetNation()

	return (
		<React.Fragment>
			{/* {data && (
				<Modal
					content={
						<ModalContent
							width={"300px"}
							title={"예금 신청"}
							titleSize={"var(--student-h1)"}
							icon={APPLY_ICON}
							content={
								<FinanceDepositApplyModal
									closeComp={closeComp}
									unit={` ${nation?.currency}`}
									data={data}
									account={account}
								/>
							}
							forChild={true}
						/>
					}
					compState={compState}
					closeComp={closeComp}
					transition={"scale"}
				/>
			)} */}
			{data && type === 'deposit' &&
				modal(
					<ModalContent
						width={"300px"}
						title={"예금 신청"}
						titleSize={"var(--student-h1)"}
						icon={APPLY_ICON}
						content={
							<FinanceDepositApplyModal
								closeComp={modal.close}
								unit={` ${nation?.currency}`}
								data={data as productTypeForDeposit}
								account={account}
							/>
						}
						forChild={true}
					/>,
				)}

			{data && type === 'saving' &&
				modal(
					<ModalContent
						width={"300px"}
						title={"예금 신청"}
						titleSize={"var(--student-h1)"}
						icon={APPLY_ICON}
						content={
							<FinanceSavingApplyModal
								closeComp={modal.close}
								unit={` ${nation?.currency}`}
								data={data as productTypeForSaving}
								account={account}
							/>
						}
						forChild={true}
					/>,
				)}

			<div css={itemWrapperCSS}>
				<div css={labelSectionCSS}>
					<div css={titleSectionCSS}>
						<div css={titleCSS}>{data.title}</div>
						
							{type === 'deposit' && <div><span css={highlightFontCSS}>{data.period}일</span> 예금</div>}
							{type === 'saving' && <div>{data.amount}{nation.currency} <span css={highlightFontCSS}>{data.count}주간</span> 적금</div>}
					</div>

					<div>
						<span css={highlightFontCSS}>{data.interest}%</span> 이자가 추가돼요.
					</div>
					{/* <div>{props.period}일 </div> */}
				</div>
				<Button
					text={"신청"}
					fontSize={"var(--student-h3)"}
					width={"72px"}
					theme={"mobileNormal"}
					onClick={() => {
						modal.open()
					}}
				/>
			</div>
		</React.Fragment>
	)
}

const itemWrapperCSS = css`
	width: 100%;
	padding: 16px;
	background-color: rgba(0, 0, 0, 0.05);
	border-radius: 10px;
	margin-top: 16px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	direction: ltr;
`

const titleCSS = css`
	font-size: var(--student-h2);
	font-weight: 500;
`

const labelSectionCSS = css`
	display: flex;
	flex-direction: column;
	gap: 8px;
`

const highlightFontCSS = css`
	font-weight: 600;
	color: var(--student-main-color-5);
`

const titleSectionCSS = css`
	display: flex;
	align-items: center;
	gap: 8px;
`

export default FinanceListProduct
