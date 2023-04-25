import React from 'react'
import Form from '@/components/teacher/common/Form/Form'
import Test from '@/components/teacher/common/Form/Test'
import Test2 from '@/components/teacher/common/Form/Test2'

function index() {
  return (
    <div>
        index
        <Form subInit={{test:'', test2:''}} subInput={<Test />} idx={3} titlePlaceHolder={'제목을 입력해 주세요!'} contentPlaceHolder={'내용을 입력해 주세요!'} frontComp={<Test2 />} />
    </div>
  )
}

export default index