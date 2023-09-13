import RuleCreate from '@/components/student/Job/Rule/RuleCreate'
import React, { useEffect, useState } from 'react'
import { css } from "@emotion/react"
import { useRouter } from 'next/router'
import { getClassRuleItemAPI } from '@/api/student/gov/getClassRuleItemAPI'
import { getGovRuleType } from '@/types/teacher/apiReturnTypes'

function index() {
  const router = useRouter()
  const {ruleId} = router.query

  const [rule, setRule] = useState<getGovRuleType>()

  useEffect(() => {
    // 개별 글 받아오는 api 작성
    if (ruleId) {
      getClassRuleItemAPI({id: String(ruleId)})
      .then((res) => {
        setRule(() => res)
      })
    }
  }, [ruleId])

  if (rule) {
    return (
      <div css={ruleListWrapperCSS}>
        <RuleCreate id={rule.id} title={rule.title} content={rule.detail} />
      </div>
    )
  }
  
}
const ruleListWrapperCSS = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`




export default index