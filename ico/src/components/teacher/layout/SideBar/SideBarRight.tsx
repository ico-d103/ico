import React from 'react'
import { css } from "@emotion/react";
import { useRouter } from 'next/router';
import { MAIN_SIGNOUT } from './SideBarIcons';

type SideBarRightProps = {
  element: {
      name: string,
      label: string,
      content: any,
      url: string
  }[],
  selectHandler: Function,
  selected: number,
  title: string,
}

function SideBarRight({element, selectHandler, selected, title}: SideBarRightProps) {
  const router = useRouter();

  const routingHandler = (value: string) => {
    router.push(value)
  }

  const signoutHandler = () => {
    // 로그아웃 로직 작성
  }

  const renderElement = element.map((el, idx) => {
    return (
      <div key={`${el.name}-${idx}`} css={elementWrapperCSS({target:idx, selected})} onClick={() => {routingHandler(el.url); selectHandler(() => idx)}}>
        <div css={contentWrapperCSS}>
          {el.content}
        </div>
        {el.label}
      </div>
    )
  })

  return (
    <div css={sideBarRightWrapperCSS}>

      <div>
        <div css={titleWrapperCSS}>
          {title}
        </div>
        {renderElement}
      </div>

      <div css={footerWrapperCSS}>
        <div>
          <div css={userNameCSS}>김철수 교사님</div>
          <div css={userEmailCSS}>example@google.com</div>
        </div>
        <div css={footerElementWrapperCSS({target:-1, selected})} onClick={() => {signoutHandler();}}>
        {MAIN_SIGNOUT}
        </div>
      </div>

    </div>
  )
}

const sideBarRightWrapperCSS = css`
  flex: 1;
  height: 100%;
  background-color: #06603B;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  padding: 40px 16px 36px 16px;
`

const titleWrapperCSS = css`
  color: rgb(255,255,255);
  font-size: 1.6rem;
  margin-bottom: 48px;
`

const elementWrapperCSS = ({target, selected}: {target: number, selected: number}) => {
  return css`
    padding: 10px 16px 10px 16px;
    margin: 8px 4px 8px 4px;
    transition-property: background-color opacity;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: ${target === selected && '#38735A'};
    cursor: pointer;
    color: rgba(255,255,255, 1);
    opacity: ${target === selected ? '100%' : '60%'};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    
    &:hover {
      background-color: ${target !== selected && '#38735A'};
    }
  `
}


const footerElementWrapperCSS = ({target, selected}: {target: number, selected: number}) => {
  return css`
    padding: 12px;
    transition-property: background-color opacity;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: ${Number(target) === Number(selected) && '#38735A'};
    opacity: ${target === selected ? '100%' : '60%'};
    cursor: pointer;
    
    &:hover {
      background-color: ${Number(target) !== Number(selected) && '#38735A'};
    }
  `
}

const contentWrapperCSS = css`
  margin-right: 12px;
`

const footerWrapperCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const userNameCSS = css`
  color: rgb(255,255,255);
  margin-bottom: 8px;
`

const userEmailCSS = css`
  color: rgba(255,255,255,0.5);
`


export default SideBarRight