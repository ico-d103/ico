import React from 'react'
import Form from '@/components/teacher/common/Form/Form'
import Test from '@/components/teacher/common/Form/Test'
import Test2 from '@/components/teacher/common/Form/Test2'
import CollapseMenu from '@/components/teacher/common/CollapseMenu/CollapseMenu'
import TableGenerator from '@/components/teacher/common/TableGenerator/TableGenerator'
import { css } from "@emotion/react"


function index() {

  const creditRating = [
    ['등급', '1등급', '2등급', '3등급', '4등급', '5등급', '6등급', '7등급', '8등급', '9등급', '10등급',],
    ['최저', '901', '801', '701', '601', '501', '401', '301', '201', '101', '0',],
    ['최고', '100', '900', '800', '700', '600', '500', '400', '300', '200', '100',],
  ]

  return (
    <React.Fragment>

      <CollapseMenu title={'신용 등급'}>
      신용등급의 등락폭을 수정할 수 있습니다.
      <div css={tableWrapperCSS}>
        <TableGenerator table={creditRating} perHeight={'48px'} />
      </div>
      
        
      </CollapseMenu>

      <div css={contentWrapperCSS}>
        <Form mainInit={{title: 'zzzz', content: 'hahaha'}} subInit={{test:'', test2:''}} subInput={<Test />} idx={3} titlePlaceHolder={'제목을 입력해 주세요!'} contentPlaceHolder={'내용을 입력해 주세요!'} frontComp={<Test2 />} />

      </div>
      

        
    </React.Fragment>
  )
}

const tableWrapperCSS = css`
  margin-top: 24px;
`

const contentWrapperCSS = css`
  flex: 1;
  background-color: var(--common-back-color-2);
  border-radius: 10px;
  padding: 30px;

`

export default index