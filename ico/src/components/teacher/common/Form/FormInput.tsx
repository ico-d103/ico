import React from 'react'
import { css } from "@emotion/react"

type FormInputProps = {
  children: any
  titleChangeHandler: React.ChangeEventHandler<HTMLInputElement>
  contentChangeHandler: React.ChangeEventHandler<HTMLInputElement>

}
function FormInput({children, titleChangeHandler, contentChangeHandler}: FormInputProps) {

  const titleInput = (
    <React.Fragment>
      <input css={inputCSS} onChange={titleChangeHandler}/>
      <div css={lineCSS}/>
    </React.Fragment>
  )

  const contentInput = (
    <input css={inputCSS} onChange={contentChangeHandler}/>
  )


  return (
    <div css={wrapperCSS}>
      {titleInput}
      {contentInput}
    </div>
  )
}

const wrapperCSS = css`
width: 100%;
height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 4px 16px 4px 16px;
  background-color: rgba(255, 255, 255, 0.1);
`

const inputCSS = css`
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  padding: 12px 0px 12px 0px;
  font-weight: 500;
`

const lineCSS = css`
  width: 100%;
  height: 1px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);

`

export default FormInput