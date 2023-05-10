import React from 'react'
import UseAnimations from "react-useanimations"
import loading from "react-useanimations/lib/loading"
import { css } from "@emotion/react"

function Loading({size, fontSize, label}: {size: number; fontSize?: number; label?: string}) {
  return (
    <div css={wrapperCSS}>
        <UseAnimations animation={loading} size={size} />
        <div css={labelCSS({fontSize})}>{label}</div>
    </div>
  )
}

const wrapperCSS = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const labelCSS = ({fontSize}: {fontSize?: number}) => {
    return css`
        margin-top: ${fontSize && fontSize / 3}px;
        font-size: ${fontSize}px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
    `
}

export default Loading