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

      

      
    </div>
  )
}

const daysWrapperCSS = css`
  display: grid;
  grid-template-columns: repeat(7, 64px);
  grid-template-rows: repeat(5, 64px);
  place-items: center;
`

const cautionWrapperCSS = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default GovJobPayday