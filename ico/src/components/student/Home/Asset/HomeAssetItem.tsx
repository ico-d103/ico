import React, {useState} from 'react'
import { css } from "@emotion/react"

type HomeAssetItemProps = {
    icon: any
    title: string
    money: number
    moneyUnit: string
    detailUrl: string


}

function HomeAssetItem({icon, title, money, moneyUnit, detailUrl }: HomeAssetItemProps) {

  return (
    <div css={contentWrapperCSS}>
        <div css={leftWrapperCSS}>
            <div css={imgWrapperCSS}>
                {icon}
            </div>
            <div css={textContentWrapperCSS}>
                <div css={titleWrapperCSS}>
                    {title}
                </div>
                <div css={moneyWrapperCSS}>
                    {money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{moneyUnit}
                </div>  
            </div>
        </div>
        <div>
            자세히
        </div>
    </div>
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
    background-color: #D9D9D9;
    width: 32px;
    height: 32px;
    margin-right: 8px;

    display: flex;
    justify-content:center;
    align-items: center;
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
    font-weight: 700;
`

const moneyWrapperCSS = css`
    font-size: var(--student-h3);
    font-weight: 700;
`

export default HomeAssetItem