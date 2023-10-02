import React from 'react'
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { css } from "@emotion/react"
import { isNavigating } from '@/store/store'
import { useAtom } from 'jotai'

function Alert({size, labelSize, label, labelMargin}: {size: number; labelSize?: number; label?: string; labelMargin?: string;}) {
  const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
  return (
    <div css={wrapperCSS}>
      <div css={css`width: ${size}px; height: ${size}px;`}>
        {isNavigatingAtom === false && <UseAnimations animation={alertCircle} size={size} />}
      </div>
        
        <div css={labelCSS({labelSize, labelMargin})}>{label}</div>
    </div>
  )
}

const wrapperCSS = css`
    flex: 1;
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

export default Alert