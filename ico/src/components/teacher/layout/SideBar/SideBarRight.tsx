import React from 'react'
import { css } from "@emotion/react";
import { useRouter } from 'next/router';

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

  const renderElement = element.map((el, idx) => {
    return (
      <div css={elementWrapperCSS({target:idx, selected})} onClick={() => {routingHandler(el.url); selectHandler(() => idx)}}>
        <div css={contentWrapperCSS}>
          {el.content}
        </div>
        {el.label}
      </div>
    )
  })

  return (
    <div css={sideBarRightWrapperCSS}>
      <div css={titleWrapperCSS}>
        {title}
      </div>
      
      {renderElement}
    </div>
  )
}

const sideBarRightWrapperCSS = css`
  flex: 1;
  height: 100%;
  background-color: #06603B;
  display: flex;
  flex-direction: column;
  user-select: none;
  padding: 40px 16px 0px 16px;
`

const titleWrapperCSS = css`
  color: rgb(255,255,255);
  font-size: 1.6rem;
  margin-bottom: 44px;
`

const elementWrapperCSS = ({target, selected}: {target: number, selected: number}) => {
  return css`
    padding: 10px 16px 10px 16px;
    margin: 4px;
    transition-property: background-color;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: ${target === selected && '#38735A'};
    cursor: pointer;
    color: rgba(255,255,255, 0.7);
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    
    &:hover {
      background-color: ${target !== selected && '#1E6B4B'};
    }
  `
}

const contentWrapperCSS = css`
  margin-right: 12px;
`

export default SideBarRight