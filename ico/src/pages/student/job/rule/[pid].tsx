import RuleCreate from '@/components/student/Job/Rule/RuleCreate'
import React, { useEffect } from 'react'
import { css } from "@emotion/react"
import { useRouter } from 'next/router'

function index() {
  const router = useRouter()

  useEffect(() => {
    // 개별 글 받아오는 api 작성
  }, [])

  return (
    <div css={ruleListWrapperCSS}>
      <RuleCreate id={1} title={'개학 소식'} content={'개학 소식이예요!'} />
    </div>
  )
}
const ruleListWrapperCSS = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`




export default index