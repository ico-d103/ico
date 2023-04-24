import React from 'react'
import { css } from "@emotion/react";

type SideBarLeftProps = {
  element: {[prop: number]: {name: string, label:string, content: any}},
  logo: any,
  selectHandler: Function,
  selected: number,
}

function SideBarLeft({element, logo, selectHandler, selected}: SideBarLeftProps) {

  const renderElement = Object.keys(element).map((el: any, idx) => {
    return (
      <div css={elementWrapperCSS({target:el, selected})} onClick={() => {selectHandler(el)}}>
        {element[el].content}
      </div>
    )
  })

  return (
    <div css={sideBarLeftWrapperCSS}>
      <div css={logoWrapperCSS}>
        {logo}
      </div>
      {renderElement}
    </div>
  )
}

const sideBarLeftWrapperCSS = css`
  width: 90px;
  height: 100%;
  background-color: #064F32;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`

const logoWrapperCSS = css`
  margin-top: 36px;
  margin-bottom: 36px;
`

const elementWrapperCSS = ({target, selected}: {target: number, selected: number}) => {
  return css`
    padding: 16px;
    margin: 4px;
    transition-property: background-color;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: ${Number(target) === Number(selected) && '#38735A'};
    cursor: pointer;
    
    &:hover {
      background-color: ${Number(target) !== Number(selected) && '#1A5B40'};
    }
  `
}

export default SideBarLeft