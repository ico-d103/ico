import React, {useState, useEffect} from "react"
import { css } from "@emotion/react"
import useGetNation from "@/hooks/useGetNation"
import useShopHandler from "../useShopHandler"

type ShopBasketItemPropsType = {
	id: number
	count: number
	title: string
	amount: number
	image: string
  delProduct: ({id}: {id: number}) => void
}

export const DELETE_ICON = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
			stroke="black"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

function ShopBasketItem({ id, count, title, amount, image, delProduct }: ShopBasketItemPropsType) {

	const [nation] = useGetNation()

	return (
		<div css={wrapperCSS}>
			<div css={imageWrapperCSS}>
				<img src={image} css={imageCSS} />
			</div>
			<div css={textWrapperCSS}>
				<div css={productInfoWrapperCSS}>
					<span
						css={css`
							font-size: 18px;
							font-weight: 700;
						`}
					>
						{title}
					</span>
					<div css={deleteIconCSS} onClick={() => delProduct({id})}>{DELETE_ICON}</div>
				</div>

				<span
					css={css`
						font-size: 18px;
					`}
				>
					{(amount * count).toLocaleString("ko-KR")} {nation.currency}
				</span>

				<span
					css={css`
						font-size: 18px;
					`}
				>
					수량 : {count}
				</span>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	height: 96px;

	width: 100%;

	display: flex;
	gap: 16px;
  margin-top: 16px;
	padding-bottom: 16px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const imageWrapperCSS = css`
	position: relative;
	width: 96px;
	&:after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
`

const imageCSS = css`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
`

const textWrapperCSS = css`
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1;
`

const productInfoWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const deleteIconCSS = css`
  cursor: pointer;
`

export default ShopBasketItem
