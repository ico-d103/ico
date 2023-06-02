import React from 'react'
import { css } from "@emotion/react"


type AccountItemProps = {
    title: string;
    content: string
}

function AccountItem({title, content}: AccountItemProps) {
  return (
    <div css={profileIndividualWrapperCSS}>
            <div css={profileIndividualTitleCSS}>{title}</div>
            <div>{content}</div>
        </div>
  )
}

const profileIndividualWrapperCSS = css`
    width: 100%;
    height: 84px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const profileIndividualTitleCSS = css`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 6px;
`

export default AccountItem