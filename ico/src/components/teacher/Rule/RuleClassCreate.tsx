import React from 'react'
import Form from '../common/Form/Form'
import Button from '@/components/common/Button'
import { css } from "@emotion/react"

type RuleClassCreateProps = {
    idx: number
    mainInit?: { title: string, content: string }
}
function RuleClassCreate({idx, mainInit}: RuleClassCreateProps) {

    const submitRender = (
        <div css={submitWrapperCSS}>
            <Button text={'취소'} fontSize={'var(--teacher-h5)'} width={'110px'} height={'35px'} theme={'cancelLight'} margin={'0px 8px 0px 0px'}/>
            <Button text={'작성'} fontSize={'var(--teacher-h5)'} width={'110px'} height={'35px'} theme={'highlighted'} />
        </div>
        
    )
  return (
    <Form
        mainInit={mainInit ? mainInit : { title: '', content: '' }}
        subInput={submitRender}
        idx={idx}
        titlePlaceHolder={"제목을 입력해 주세요!"}
        contentPlaceHolder={"내용을 입력해 주세요!"}
    />
  )
}

const submitWrapperCSS = css`
    
    display: flex;
    justify-content: end;
    padding: 8px;

`
export default RuleClassCreate