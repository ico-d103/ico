import React from 'react'
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type ContentWrapperProps = {
    children: any
    cssProps?: SerializedStyles
}

function ContentWrapper({children, cssProps}: ContentWrapperProps) {
  return (
    <div css={[contentWrapperCSS, cssProps]}>
        {children}
    </div>
  )
}
const contentWrapperCSS = css`
    max-width: 95%;
    width: 95%;
    padding: 24px;
    border-radius: 20px;
    background-color: var(--student-wrapper-color);
    margin-bottom: 16px;
`

export default ContentWrapper