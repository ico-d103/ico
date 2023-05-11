import { css } from "@emotion/react"

type PropertyListItemPropsType = {
	mock: {
		id: number
		date: string
		money: string
		content: string
		name: string
	}
	showDate: boolean
}

function PropertyListItem({ mock, showDate }: PropertyListItemPropsType) {
	return (
		<tr css={wrapperCSS}>
			<td css={dateCSS}>{showDate ? <h4>{mock.date}</h4> : <h4 css={hiddenDateCSS}>{mock.date}</h4>}</td>
			<td css={moneyCSS}>
				{mock.money.includes("+") ? (
					<h3 css={plusMoneyCSS}>{mock.money}</h3>
				) : (
					<h3 css={minusMoneyCSS}>{mock.money}</h3>
				)}
			</td>
			<td css={contentCSS}>
				<h3>{mock.content}</h3>
			</td>
			<td css={nameCSS}>
				<h3>{mock.name}</h3>
			</td>
		</tr>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 15px;
	border-radius: 10px;
	transition: all 0.1s;

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	h3 {
		font-size: var(--teacher-h3);
	}

	h4 {
		font-size: var(--teacher-h4);
	}
`

const dateCSS = css`
	width: 100px;

	> h4 {
		color: var(--teacher-gray-color);
	}
`

const moneyCSS = css`
	width: 150px;
	text-align: right;
	margin-right: 50px;

	> h3 {
		font-weight: bold;
	}
`

const contentCSS = css`
	flex: 5;
	min-width: 150px;
`

const nameCSS = css`
	width: 150px;
	text-align: right;
`

const hiddenDateCSS = css`
	visibility: hidden;
`

const plusMoneyCSS = css`
	color: var(--teacher-blue-color);
`

const minusMoneyCSS = css`
	color: var(--teacher-warning-color);
`

export default PropertyListItem
