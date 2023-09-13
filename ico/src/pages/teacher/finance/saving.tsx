import React, { useState } from "react"
import Button from "@/components/common/Button/Button"
import { css } from "@emotion/react"

import { useQuery } from "@tanstack/react-query"

function saving() {
	const [addDeposit, setAddDeposit] = useState(false) // "추가" 버튼을 눌렀을 때의 상태 추가

	const handleAddButtonClick = () => {
		setAddDeposit(true)
	}

	const handleCancelClick = () => {
		setAddDeposit(false)
	}

	// const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<depositProductType[]>(
	// 	["teacher", "financeDeposit"],
	// 	getDepositListAPI,
	// )

	// if (!data) {
	// 	return null
	// }
	// test
	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>적금</div>
				{addDeposit ? (
					<div></div>
				) : (
					<div>
						<Button
							text={"예금 상품 추가하기"}
							fontSize={"var(--teacher-h5)"}
							width={"200px"}
							theme={"normal"}
							onClick={handleAddButtonClick}
						/>
					</div>
				)}
			</div>
			<div css={subTitleCSS}>적금 상품을 만들고 신용등급에 따른 적금 이자율을 설정할 수 있습니다.</div>

			{/* {addDeposit ? (
				<div>
					<FinanceDepositCreate onCancelClick={handleCancelClick} />
				</div>
			) : (
				<div></div>
			)}

			<div css={contentCSS}>
				{data.map((item) => (
					<FinanceDepositList key={item.id} data={item} />
				))}
			</div> */}
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
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
	margin-bottom: 36px;
`

const contentCSS = css`
	// margin-top: 50px;
`

export default saving
