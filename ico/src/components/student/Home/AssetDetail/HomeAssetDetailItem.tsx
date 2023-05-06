import React from "react"
import { css } from "@emotion/react"

type HomeAssetDetailItemProps = {
	title: string
	source?: string
	balance: number
	amount: number
    unit: string
}

const PLUS_ICON = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
			stroke="black"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

const MINUS_ICON = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
			stroke="black"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

function HomeAssetDetailItem({ title, source, balance, amount, unit }: HomeAssetDetailItemProps) {

    const amountColor = amount > 0 ? '#0066FF' : 'rgba(0, 0, 0, 0.7)'

	return (
		<div css={itemWrapperCSS}>
            <div css={iconWrapperCSS}>
                {amount > 0 ? PLUS_ICON : MINUS_ICON}
            </div>
            <div css={textContentWrapperCSS}>
                <div css={columnWrapperCSS}>
                    <div css={[lSizeFontCSS]}>{title}</div>
                    <div css={[lSizeFontCSS, css`color: ${amountColor};`]}>{amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{unit}</div>
                </div>
                <div css={columnWrapperCSS}>
                    <div css={[sSizeFontCSS]}>{source}</div>
                    <div css={[sSizeFontCSS]}>{balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{unit}</div>
                </div>
            </div>
			
		</div>
	)
}

const itemWrapperCSS = css`
	margin-bottom: 20px;
	/* margin-left: 16px; */
    display: flex;
    width: 100%;

`

const iconWrapperCSS = css`
    border-radius: 9999px;
    background-color: #f7dd9d;
    /* border: 0.5px solid #feb600; */
    width: 36px;
    height: 36px;
    margin-right: 12px;

    display: flex;
    justify-content:center;
    align-items: center;

    & path {
        stroke: #9b6f00;
        
    }
`

const textContentWrapperCSS = css`
    flex: 1;
`

const columnWrapperCSS = css`
	display: flex;
	justify-content: space-between;
    
`

const lSizeFontCSS = css`
	font-size: var(--student-h3);
	font-weight: 700;
	line-height: 140%;
`

const sSizeFontCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);
`

export default HomeAssetDetailItem
