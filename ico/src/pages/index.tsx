import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"

export default function Home() {
	return (
		<div css={guideWrapperCSS}>
			<div css={shadowWrapperCSS}>
				<div css={shadowLeftCSS}></div>
			</div>
			
		</div>
	)
}

const guideWrapperCSS = css`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	padding: 48px;
`

const shadowWrapperCSS = css`
	width: 100px;
	height: 100px;
`

const shadowLeftCSS = css`
	width: 100%;
	height: 100%;
	border-left: 100% solid red;
	border-top: 50% solid transparent;
	border-bottom: 50% solid transparent;
	filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) ;
`
