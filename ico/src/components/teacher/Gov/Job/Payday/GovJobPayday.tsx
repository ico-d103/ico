import { getGovPaydayType } from '@/types/teacher/apiReturnTypes';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react'
import GovJobPaydayItem from './GovJobPaydayItem';
import { css } from "@emotion/react"

type GovJobPaydayPropsType = {
  query: UseQueryResult<getGovPaydayType, unknown>
}
function GovJobPayday({query}: GovJobPaydayPropsType) {
  const days = Array(31).fill(null).map((v,i)=>i+1);

  const renderDays = query.isSuccess && days.map((el) => {
    const canOverTheMonth = el > 28
    const isSelected = query.data.paydays.includes(el)
    return <GovJobPaydayItem day={el} canOverTheMonth={canOverTheMonth} isSelected={isSelected}/>
  })


  return (
    <div>
      <div css={daysWrapperCSS}>
        {renderDays}
      </div>

      <div css={css`margin-top: 16px; font-size: 14px;`}>❕28~31일의 경우, 당월에 해당 날짜가 없으면 당월 마지막 날에 월급이 지급됩니다.</div>

      
    </div>
  )
}

const daysWrapperCSS = css`
  /* display: grid;
  grid-template-columns: repeat(20, 64px);
  grid-template-rows: repeat(4, 64px); */
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  place-items: center;
`

const cautionWrapperCSS = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default GovJobPayday