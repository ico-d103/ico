import React from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import HomeAssetDetail from "@/components/student/Home/AssetDetail/HomeAssetDetail"
import { css } from "@emotion/react"


const tradeHistory: any = {
	"05월 05일 · 오늘": [
		{
			title: "거래 내역 누락",
			amount: 100,
			balance: 25600,
			source: "학생 상점",
		},
		{
			title: "거래 내역 누락",
			amount: 100,
			balance: 25600,
			source: "학생 상점",
		},
	],
	"05월 04일 · 어제": [
		{
			title: "거래 내역 누락",
			amount: 100,
			balance: 25600,
			source: "학생 상점",
		},
		{
			title: "거래 내역 누락",
			amount: 100,
			balance: 25600,
			source: "학생 상점",
		},
	],
	"04월 25일": [
		{
			title: "거래 내역 누락",
			amount: -25100,
			balance: 25600,
			source: "학생 상점",
		},
		{
			title: "거래 내역 누락",
			amount: 10000,
			balance: 25600,
			source: "학생 상점",
		},
	],
	"04월 24일": [
		{
			title: "거래 내역 누락",
			amount: 100,
			balance: 25600,
			source: "학생 상점",
		},
		{
			title: "거래 내역 누락",
			amount: 100,
			balance: 25600,
			source: "학생 상점",
		},
	],
}


function asset() {
	return (
		<div>
			<PageHeader title={"국고"} />
			<div css={assetWrapperCSS}>
				<ContentWrapper>
                    <div css={sSizeFontCSS}>
                        보유중인 국고
                    </div>
                    <div css={lSizeFontCSS}>
                        253,015 미소
                    </div>
                </ContentWrapper>
				<ContentWrapper>
                    <HomeAssetDetail tradeHistory={tradeHistory} />
                </ContentWrapper>
			</div>
		</div>
	)
}

const assetWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const lSizeFontCSS = css`
    font-size: var(--student-h1);
    font-weight: 700;
    line-height: 150%;

`

const sSizeFontCSS = css`
    font-size: var(--student-h4);
    color: rgba(0, 0, 0, 0.6);
`

export default asset
