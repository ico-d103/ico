import React from "react"
import { css } from "@emotion/react"
import ContentWrapper from "../../common/ContentWrapper/ContentWrapper"
import useNavigate from "@/hooks/useNavigate";

type HomeTipCardProps = {
    mainLabel: string;
    subLabel: string;
    url: string;
}

function HomeTipCard({mainLabel, subLabel, url}: HomeTipCardProps) {
	const navigate = useNavigate()

	return (
		// <ContentWrapper cssProps={css`user-select: none;`}>
			<div css={wrapperCSS} onClick={() => {navigate(url, 'bottomToTop')}}>
				<div css={lsizeFontCSS}>{mainLabel}</div>
				<div css={msizeFontCSS}>{subLabel}</div>
			</div>
			
		// </ContentWrapper>
	)
}

const lsizeFontCSS = css`
	font-size: 1.1rem;
	font-weight: 700;
	margin-bottom: 4px;
`

const msizeFontCSS = css`
	font-size: var(--student-h4);
	font-weight: 500;
	margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.6);
`

const wrapperCSS = css`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;

background-color: white;
border-radius: 20px;
margin: 0px 0px 16px 0px;
padding: 16px;
/* align-items: center; */

`
export default HomeTipCard
