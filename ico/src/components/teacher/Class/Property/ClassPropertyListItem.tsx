import useGetNation from "@/hooks/useGetNation"
import { css } from "@emotion/react"

type PropertyListItemPropsType = {
	property: {
		date: string
		title: string
		source: string
		amount: string
	}
	showDate: boolean
}

function PropertyListItem({ property, showDate }: PropertyListItemPropsType) {
	const [nation] = useGetNation()

	return (
		<tr css={wrapperCSS}>
			<td css={dateCSS}>{showDate ? <h4>{property.date}</h4> : <h4 css={hiddenDateCSS}>{property.date}</h4>}</td>
			<td css={moneyCSS}>
				{property.amount.includes("-") ? (
					<h3 css={minusMoneyCSS}>
						{property.amount} {nation.currency}
					</h3>
				) : (
					<h3 css={plusMoneyCSS}>
						{property.amount} {nation.currency}
					</h3>
				)}
			</td>
			<td css={titleCSS}>
				<h3>{property.title}</h3>
			</td>
			<td css={sourceCSS}>
				<h3>{property.source}</h3>
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

const titleCSS = css`
	flex: 5;
	min-width: 150px;
`

const sourceCSS = css`
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
