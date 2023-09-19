import { getClassRuleAPI } from '@/api/student/gov/getClassRuleAPI'
import RuleList from '@/components/student/Job/Rule/RuleList'
import { getGovRuleType } from '@/types/teacher/apiReturnTypes'
import { useQuery } from '@tanstack/react-query'
import { css } from "@emotion/react"
import React from 'react'
import RuleCreate from '@/components/student/Job/Rule/RuleCreate'
import Button from '@/components/common/Button/Button'
import useNavigate from '@/hooks/useNavigate'
import { getGovRuleAPI } from '@/api/teacher/gov/getGovRuleAPI'

function news() {
  const navigate = useNavigate()
  const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getGovRuleType[]>(
		["studentJobNews"],
		getGovRuleAPI,
		// { staleTime: 200000 },
	)
    // api에서 날짜도 받아올 것!
  return (
    <div css={ruleListWrapperCSS}>
      <div css={ruleTitleWrapperCSS}>
        학급 소식
        <Button
				text={"글 작성"}
				fontSize={`var(--student-h3)`}
				width={"100px"}
        height={"36px"}
				// height={"70vw"}
				theme={"mobileSoft"}
				
				onClick={() =>{navigate('/student/job/rule/create', 'bottomToTop')}}
			></Button>
      </div>
      
      {isSuccess && <RuleList rules={data}/>}
    </div>
  )
}
const ruleListWrapperCSS = css`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ruleTitleWrapperCSS = css`
  width: 95%;
  font-size: var(--student-h1);
  margin: 24px 0px 24px 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
export default news