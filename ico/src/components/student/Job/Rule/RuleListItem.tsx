import { getGovRuleType } from '@/types/teacher/apiReturnTypes'
import React from 'react'
import { css } from "@emotion/react"
import ContentWrapper from '../../common/ContentWrapper/ContentWrapper'
import Button from '@/components/common/Button/Button'
import useNavigate from '@/hooks/useNavigate'

type RuleItemProps = {
  rule: getGovRuleType
}

function RuleListItem({rule}: RuleItemProps) {
  const navigate = useNavigate()

  return (
    <ContentWrapper css={wrapperCSS}>
      <div css={ruleTitleWrapperCSS}>
       {rule.title}
       <Button
					text={"수정"}
					fontSize={`var(--student-h3)`}
					width={"84px"}
					height={"28px"}
					// height={"70vw"}
					theme={"mobileSoft3"}
					onClick={() => {
						navigate(`/student/job/rule/${rule.id}`, "bottomToTop")
					}}
				></Button>
      </div>
      <div css={lineCSS}/>
      <div css={ruleDataWrapperCSS}>
        <span>최초 작성자 : {rule.author}</span>
        <span>{rule.createdAt === rule.updatedAt ? `작성일 : ${rule.createdAt}` : `수정일 : ${rule.updatedAt}`}</span>
      </div>
      {rule.detail}
    </ContentWrapper>
  )
}

const wrapperCSS = css`
  white-space: pre-wrap;
  line-height: 150%;
`

const lineCSS = css`
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    margin: 8px 0px 8px 0px;
`

const ruleTitleWrapperCSS = css`
  font-size: var(--student-h2);
  /* margin-bottom: 16px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ruleDataWrapperCSS = css`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 8px;
`

export default RuleListItem