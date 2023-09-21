import { css } from "@emotion/react"
import { useQuery } from "@tanstack/react-query"

import useCompHandler from "@/hooks/useCompHandler"

import { getDepositListAPI } from "@/api/teacher/finance/getDepositListAPI"

import { depositProductType } from "@/types/teacher/apiReturnTypes"

import Button from "@/components/common/Button/Button"
import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"

import FinanceDepositList from "@/components/teacher/Finance/Deposit/FinanceDepositList"
import FinanceDepositCreate from "@/components/teacher/Finance/Deposit/FinanceDepositCreate"

function deposit() {
	const [openComp, closeComp, compState] = useCompHandler()

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<depositProductType[]>(
		["teacher", "financeDeposit"],
		getDepositListAPI,
	)

	if (!data) {
		return null
	}

	return (
		<div css={wrapperCSS}>
			<div css={titleCSS}>
				예금
				{!compState && (
					<Button
						text={"예금 상품 추가하기"}
						fontSize={"var(--teacher-h5)"}
						width={"200px"}
						theme={"normal"}
						onClick={() => {
							openComp()
						}}
					/>
				)}
			</div>
			<div css={subTitleCSS}>신용등급에 따른 예금 이자율을 설정할 수 있습니다.</div>

			<div>
				<AnimatedRenderer compState={compState} initHeight="0">
					<FinanceDepositCreate closeHandler={closeComp} />
				</AnimatedRenderer>
			</div>

			<div>
				{data.map((item) => (
					<FinanceDepositList key={item.id} data={item} />
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

export default deposit
