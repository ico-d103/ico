import React from "react"
import { css } from "@emotion/react"
import { FinanceInvestIssueType } from "@/types/student/apiReturnTypes"

type FinanceInvestIssueListProps = {
	issueList: FinanceInvestIssueType[]
}

function FinanceInvestIssueList({ issueList }: FinanceInvestIssueListProps) {
	const renderIssueList = issueList.map((el, idx) => {
        const date = new Date(el.date)
        const today = new Date()

		return (
			<React.Fragment>
				<div css={issueWrapperCSS}>
                    <div css={sSizeFontCSS}>
                        {el.date}
                    </div>
                    <div css={rSizeFontCSS}>
                        {el.content}
                    </div>
                </div>
                {date.getMonth() === today.getMonth() && date.getDate() === today.getDate() &&
                <div css={lineWrapperCSS}>
                    
                    <div css={lineCSS}/>
                    <div css={lineLabelCSS}>이전 힌트</div>
                </div>
                }
			</React.Fragment>
		)
	})

	return (
		<div>
			<div css={mSizeFontCSS}>뉴스</div>
            {renderIssueList}
		</div>
	)
}

const issueWrapperCSS = css`
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin: 16px 0px;

    
`

const mSizeFontCSS = css`
	font-size: var(--student-h2);
	font-weight: 700;
	line-height: 150%;
`

const rSizeFontCSS = css`
	/* font-size: var(--student-h2); */
	font-weight: 500;
	/* line-height: 150%; */
`

const sSizeFontCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);
    margin-bottom: 5px;
`

const lineWrapperCSS = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
`

const lineLabelCSS = css`
    background-color: var(--student-wrapper-color);
    font-size: var(--student-h4);
    font-weight: 700;
    color: rgba(0, 0, 0, 0.4);
    position: absolute;
    padding: 0px 16px;

`

const lineCSS = css`
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
`

export default FinanceInvestIssueList
