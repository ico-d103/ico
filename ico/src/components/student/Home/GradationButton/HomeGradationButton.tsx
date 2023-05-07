import React from 'react'
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type HomeGradationButtonProps = {
    children: any
    cssProps?: SerializedStyles
    backgroundColor: [string, string]
    onClick?: () => void

}

function HomeGradationButton({children, cssProps, backgroundColor, onClick}: HomeGradationButtonProps) {
  return (
    <div css={[contentWrapperCSS({backgroundColor}), cssProps]} onClick={onClick}>
        {children}
    </div>
  )
}

const contentWrapperCSS = ({backgroundColor}: {backgroundColor: [string, string]}) => {
    return css`
        /* width: 95%; */
        padding: 16px 12px;
        border-radius: 20px;
        background-color: var(--common-back-color-2);
        margin-bottom: 16px;
        background: linear-gradient( 45deg, ${backgroundColor[0]}, ${backgroundColor[1]} );

        
        color: white;
    `
} 
export default HomeGradationButton