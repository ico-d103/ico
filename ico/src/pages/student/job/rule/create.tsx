import RuleCreate from '@/components/student/Job/Rule/RuleCreate'
import React from 'react'
import { css } from "@emotion/react"

function create() {
  return (
    <div css={ruleListWrapperCSS}>
      <RuleCreate/>
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




export default create