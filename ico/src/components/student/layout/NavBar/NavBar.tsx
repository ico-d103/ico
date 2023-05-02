import React from 'react'
import { css } from "@emotion/react"

type NavBarProps = {
    children: any
}

function NavBar({children}: NavBarProps) {
  return (
    <div css={navBarParentCSS}>
        <div css={contentWrapperCSS}>
            {children}
        </div>
        
        <div css={navBarWrapperCSS}>

        </div>
    </div>
  )
}

const navBarParentCSS = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 64px;
    
`

const contentWrapperCSS = css`
    /* max-height: calc(100vh - 64px); */
    /* position: relative; */
`

const navBarWrapperCSS = css`
    height: 64px;
    width: 100%;
    background-color: white;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 0;
`


export default NavBar