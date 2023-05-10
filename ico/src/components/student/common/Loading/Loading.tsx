import React from 'react'
import UseAnimations from "react-useanimations"
import loading from "react-useanimations/lib/loading"
import { css } from "@emotion/react"
import { isNavigating } from '@/store/store'
import { useAtom } from 'jotai'

function Loading({size, labelSize, label, labelMargin}: {size: number; labelSize?: number; label?: string; labelMargin?: string;}) {
  const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
  return (
    <div css={wrapperCSS}>
        {isNavigatingAtom === false && <UseAnimations animation={loading} size={size} />}
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