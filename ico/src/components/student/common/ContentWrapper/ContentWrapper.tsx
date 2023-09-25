import React, { ReactNode } from 'react'
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type ContentWrapperProps = {
    children: ReactNode
    cssProps?: SerializedStyles
} & React.HTMLAttributes<HTMLDivElement>;

function ContentWrapper({children, cssProps, ...props}: ContentWrapperProps) {
  return (
    <div {...props} css={[contentWrapperCSS, cssProps]}>
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