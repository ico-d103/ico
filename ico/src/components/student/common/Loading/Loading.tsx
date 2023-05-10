import React from 'react'
import UseAnimations from "react-useanimations"
import loading from "react-useanimations/lib/loading"
import { css } from "@emotion/react"

function Loading({size, labelSize, label, labelMargin}: {size: number; labelSize?: number; label?: string; labelMargin?: string;}) {
  return (
    <div css={wrapperCSS}>
        <UseAnimations animation={loading} size={size} />
        <div css={labelCSS({labelSize, labelMargin})}>{label}</div>
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

const labelCSS = ({labelSize, labelMargin}: {labelSize?: number; labelMargin?: string}) => {
    return css`
        margin: ${labelMargin};
        font-size: ${labelSize}px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
    `
}

export default Loading