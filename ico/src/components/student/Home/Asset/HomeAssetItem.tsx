import React, { useState } from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import useNavigate from "@/hooks/useNavigate"
import Link from "next/link"

type HomeAssetItemProps = {
	icon: any
	title: string
	money: number
	moneyUnit: string
	detailUrl: string
}

function HomeAssetItem({ icon, title, money, moneyUnit, detailUrl }: HomeAssetItemProps) {
	const navigate = useNavigate()

	return (
		<React.Fragment>
			<div css={contentWrapperCSS}>
				<div css={leftWrapperCSS}>
					<div css={imgWrapperCSS}>{icon}</div>
					<div css={textContentWrapperCSS}>
						<div css={titleWrapperCSS}>{title}</div>
						<div css={moneyWrapperCSS}>
							{money?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
							{moneyUnit}
						</div>
					</div>
				</div>
				<div>
					<Button
						text={"자세히"}
						fontSize={`var(--teacher-h5)`}
						width={"72px"}
						height={"100%"}
						theme={"mobileSoft3"}
						onClick={() => {
							navigate(detailUrl, "bottomToTop")
						}}
					/>
				</div>
			</div>
		</React.Fragment>
	)
}

const contentWrapperCSS = css`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 20px 0px;
`

const leftWrapperCSS = css`
	display: flex;
`

const imgWrapperCSS = css`
	border-radius: 9999px;
	background-color: #f7dd9d;
	/* border: 0.5px solid #feb600; */
	width: 36px;
	height: 36px;
	margin-right: 12px;

	display: flex;
	justify-content: center;
	align-items: center;

	& path {
		stroke: #9b6f00;
	}
`

const textContentWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const titleWrapperCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);
	font-weight: 500;
`

const moneyWrapperCSS = css`
	font-size: 1.1rem;
	font-weight: 700;
`

export default HomeAssetItem
