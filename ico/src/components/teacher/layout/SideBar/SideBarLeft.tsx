import React from 'react'
import { css } from "@emotion/react";
import { MAIN_SETTING } from './SideBarIcons';

type SideBarLeftProps = {
  element: {[prop: number]: {name: string, label:string, content: any}},
  logo: any,
  selectHandler: Function,
  selected: number,
}

function SideBarLeft({element, logo, selectHandler, selected}: SideBarLeftProps) {

  const renderElement = Object.keys(element).map((el: any, idx) => {
    return (
      <div key={`${element[el].name}-${idx}`} css={elementWrapperCSS({target:el, selected})} onClick={() => {selectHandler(el)}}>
        {element[el].content}
      </div>
    )
  })

  return (
    <div css={sideBarLeftWrapperCSS}>
      <div css={topWrapperCSS}>
        <div css={logoWrapperCSS}>
          {logo}
        </div>
        {renderElement}
      </div>
      <div css={bottomWrapperCSS}>
        <div css={elementWrapperCSS({target:-1, selected})}>
          {MAIN_SETTING}
        </div>
        <div css={bottomLineCSS} />
        <img css={userImgCSS} src={'/assets/account.png'} alt="" />
      </div>
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
  justify-content: space-between;
  user-select: none;
  padding: 36px 0px 36px 0px;
`

const topWrapperCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const bottomWrapperCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const logoWrapperCSS = css`
  margin-bottom: 36px;
`

const elementWrapperCSS = ({target, selected}: {target: number, selected: number}) => {
  return css`
    padding: 16px;
    margin: 4px;
    transition-property: background-color opacity;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: ${Number(target) === Number(selected) && '#38735A'};
    opacity: ${Number(target) === Number(selected) ? '100%' : '60%'};
    cursor: pointer;
    
    &:hover {
      background-color: ${Number(target) !== Number(selected) && '#38735A'};
    }
  `
}

const userImgCSS = css`
  cursor: pointer;
`

const bottomLineCSS = css`
  width: 100%;
  height: 1px;
  border-bottom: 2px solid rgba(255,255,255,0.2);
  margin: 8px 0px 28px 0px;
`

export default SideBarLeft