import { css } from "@emotion/react"
import FinanceInvestToggleButton from "./FinanceInvestToggleButton"
import { postInvestIssueAPI } from "@/api/teacher/finanace/postInvestIssueAPI"
import useGetNation from "@/hooks/useGetNation"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation, useQuery } from "@tanstack/react-query"

function FinanceInvestCreate({
	subInputChangeHandler,
	inputState,
	buttons,
	stock,
	tradingStart,
	tradingEnd,
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
	stock: any
	tradingStart: any
	tradingEnd: any
}) {
	const [nation] = useGetNation()
	const queryClient = useQueryClient()

	const createMutation = useMutation((a: number) =>
		postInvestIssueAPI({
			body: {
				stock: stock,
				tradingStart: tradingStart,
				tradingEnd: tradingEnd,
				amount: inputState?.sub.value,
				content: inputState?.content,
			},
		}),
	)

	// const pushInvestItem = async () => {
	// 	postInvestIssueAPI({
	// 		body: {
	// 			stock: stock,
	// 			tradingStart: tradingStart,
	// 			tradingEnd: tradingEnd,
	// 			amount: inputState?.sub.value,
	// 			content: inputState?.content,
	// 		},
	// 	})
	// 		.then((res) => {
	// 			console.log(res)
	// 		})
	// 		.catch((err) => {
	// 			console.log(err)
	// 		})
	// }

	// const submitHandler = () => {
	// 	pushInvestItem()
	// }

	const submitHandler = () => {
		createMutation.mutate(1, {
			onSuccess: () => {
				return queryClient.invalidateQueries(["teacher", "financeInvest"])
			},
		})
	}

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (inputState?.sub.taxation === 0) {
			subInputChangeHandler && subInputChangeHandler({ key: "value", event })
		}
	}

	return (
		<>
			<div css={footerWrapperCSS}>
				<div css={addInfoWrapperCSS}>
					<div css={taxValueInputWrapperCSS} style={{ width: "190px" }}>
						시작 가격을 입력해주세요.
					</div>
					<div css={taxValueInputWrapperCSS}>
						<input
							value={inputState?.sub.value}
							onChange={(event) => {
								inputHandler(event)
							}}
							type={"number"}
							css={taxInputCSS}
						/>
						{nation.currency}
					</div>
				</div>
			</div>
			{buttons(submitHandler)}
		</>
	)
}

const footerWrapperCSS = css`
	display: flex;
`

const taxValueInputWrapperCSS = css`
	height: 40px;
	width: 100px;
	color: var(--common-back-color-2);
	display: flex;
	box-sizing: border-box;
	padding: 8px;
	justify-content: end;
	align-items: center;
	position: relative;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	transition-property: background-color;
	transition-duration: 0.3s;
	white-space: nowrap;
	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
	margin-right: 5px;
`

const taxInputCSS = css`
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0);
	border: none;
	outline: none;
	color: var(--common-back-color-2);
	text-align: right;
	&::-webkit-inner-spin-button {
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
	}
`

const addInfoWrapperCSS = css`
	display: flex;
	margin-right: 10px;
`

export default FinanceInvestCreate
