import { getClassRuleType } from '@/types/student/apiReturnTypes'
import React from 'react'
import { css } from "@emotion/react"
import ContentWrapper from '../../common/ContentWrapper/ContentWrapper'
import Button from '@/components/common/Button/Button'
import useNavigate from '@/hooks/useNavigate'

type RuleItemProps = {
  rule: getClassRuleType
}

function RuleListItem({rule}: RuleItemProps) {
  const navigate = useNavigate()

  return (
    <ContentWrapper>
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
      {rule.detail}
    </ContentWrapper>
  )
}

const lineCSS = css`
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    margin: 16px 0px 16px 0px;
`

const ruleTitleWrapperCSS = css`
  font-size: var(--student-h2);
  /* margin-bottom: 16px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default RuleListItem