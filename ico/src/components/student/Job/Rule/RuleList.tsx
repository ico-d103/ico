import { getClassRuleType } from '@/types/student/apiReturnTypes'
import React from 'react'
import RuleListItem from './RuleListItem'
import { css } from "@emotion/react"

type ruleProps = {
  rules: getClassRuleType[]
}

function RuleList({rules}: ruleProps) {
  const renderRules = rules.map((el) => {
    return <RuleListItem rule={el} />
  })
  return (
    <React.Fragment>
      
      {renderRules}
    </React.Fragment>
  )
}





export default RuleList