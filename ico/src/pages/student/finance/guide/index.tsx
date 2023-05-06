import React from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"

import { css } from "@emotion/react"





function asset() {
	return (
		<div>
			<PageHeader title={"예금"} />
			<div css={guideWrapperCSS}>
				<div css={lSizeFontCSS}>
                저희 예금 상품은 아래와 <br/>같이 두가지가 있어요.
                </div>
			</div>
		</div>
	)
}

const guideWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const lSizeFontCSS = css`
    font-size: var(--student-h1);
    font-weight: 700;
    line-height: 120%;
    text-align: center;

`

const mSizeFontCSS = css`
    font-size: var(--student-h2);
    font-weight: 700;
    line-height: 150%;

`

const sSizeFontCSS = css`
    font-size: var(--student-h4);
    color: rgba(0, 0, 0, 0.6);
`

export default asset
