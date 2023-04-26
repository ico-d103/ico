import React from 'react'
import Modal from '@/components/common/Modal/Modal'
import useCompHandler from '@/hooks/useCompHandler'
import { css } from "@emotion/react"

function index() {
  const {openComp, closeComp, compState} = useCompHandler()
  return (
    <div>
      index
      <button onClick={openComp}>열기</button>
      <Modal compState={compState} closeComp={closeComp} transition={'flip'} content={<div css={css`width: 300px; height: 300px; background-color: white; border-radius: 10px; box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);`}>dwqdqgsegrrsegrse \n fweafregre</div>}/>
    </div>
  )
}

export default index