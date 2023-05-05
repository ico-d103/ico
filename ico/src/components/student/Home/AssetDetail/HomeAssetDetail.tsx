import React from "react"
import { css } from "@emotion/react"
import HomeAssetDetailItem from "./HomeAssetDetailItem"

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

function HomeAssetDetail() {

    const renderHistory = Object.keys(tradeHistory).map((key, dayIdx) => {
        const perDayHistory = tradeHistory[key].map((item:any, itemIdx:any) => {
            return (
                <div>
                    <HomeAssetDetailItem {...item} unit={'미소'}/>
                </div>
            )
        })


        return (
            <div css={perDayWrapperCSS}>
                <div css={sSizeFontCSS}>
                    {key}
                </div>
                {perDayHistory}
            </div>
        )
    })

	return (
        <div css={historyWrapperCSS}>
            {renderHistory}
        </div>
    )
}

const historyWrapperCSS = css`
    width: 100%;
`

const sSizeFontCSS = css`
    font-size: var(--student-h4);
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 20px;
`


const perDayWrapperCSS = css`
    margin-bottom: 42px;
    width: 100%;
`

export default HomeAssetDetail
