import { css } from "@emotion/react"
import ClassStudentDetailAccountListItem from "./ClassStudentDetailAccountListItem"
import { transactionsType } from "@/types/teacher/apiReturnTypes"
import Pagination from "@/components/teacher/common/Pagination/Pagination"

type ClassStudentDetailAccountListPropsType = {
	transactions: transactionsType | undefined
	size: number | undefined
}

function ClassStudentDetailAccountList({ transactions, size }: ClassStudentDetailAccountListPropsType) {
	let prevDate: string | null = null

	return (
		<div css={wrapperCSS}>
			<div css={listWrapperCSS}>
				<h4>거래 내역</h4>
				<div css={contentCSS}>
					{transactions && Object.keys(transactions).length > 0 ? (
						Object.keys(transactions).map((date) => {
							const transactionList = transactions[date]

							const result = transactionList.map((transaction, index) => {
								const showDate = date !== prevDate
								prevDate = date

								return (
									<ClassStudentDetailAccountListItem
										key={index}
										date={date}
										transaction={transaction}
										showDate={showDate}
									/>
								)
							})

							return result
						})
					) : (
						<div css={noneListWrapperCSS}>
							<h5>거래 내역이 없습니다.</h5>
						</div>
					)}
				</div>
			</div>
			{transactions && Object.keys(transactions).length > 0 && (
				<Pagination size={size ? size : 1} maxSize={5} margin={"0 0 0 0"} buttonSize={"30px"} />
			)}
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	min-height: 300px;
`

const contentCSS = css`
	height: 200px;
	overflow-y: scroll;
`

const listWrapperCSS = css`
	width: 100%;
	padding: 30px;
	border: 1px solid #dde3ea;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	margin-bottom: 30px;
	min-height: 300px;

	> h4 {
		font-size: var(--teacher-h4);
		font-weight: bold;
		margin-bottom: 20px;
	}
`

const noneListWrapperCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;

	> h5 {
		font-size: var(--teacher-h5);
	}
`

export default ClassStudentDetailAccountList
