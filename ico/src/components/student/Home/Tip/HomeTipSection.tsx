import React from 'react'
import HomeTipCard from './HomeTipCard'
import { css } from "@emotion/react"

function HomeTipSection() {
  return (
    <div css={sectionWrapperCSS}>
        <HomeTipCard mainLabel={'우리 반의 학급 규칙을 함께 알아보아요!'} subLabel={"건강한 문화를 선도하는 멋진 시민이 되어볼까요?"} url={'/student/gov/rule'}/>
        <HomeTipCard mainLabel={'일자리를 찾고 있나요?'} subLabel={"지금 어떤 직업에 자리가 있는지 보러 가볼까요?"} url={'/student/class/jobsearch'}/>
    </div>
  )
}

const sectionWrapperCSS = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default HomeTipSection