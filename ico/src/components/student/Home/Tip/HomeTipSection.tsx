import React from 'react'
import HomeTipCard from './HomeTipCard'
import { css } from "@emotion/react"

function HomeTipSection() {
  return (
    <div css={sectionWrapperCSS}>
        <HomeTipCard mainLabel={'우리 반의 학급 규칙을 함께 알아보아요!'} subLabel={"건강한 문화를 선도하는 멋진 시민이 되어볼까요?"} url={'/'}/>
        <HomeTipCard mainLabel={'신용 등급이 너무 어려운가요?'} subLabel={"등급이 결정되는 기준을 모르겠다구요? 함께 알아보아요!"} url={'/'}/>
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