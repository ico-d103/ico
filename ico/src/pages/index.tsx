import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"

export default function Home() {
	return (
		<div css={guideWrapperCSS}>
			<div css={scene1CSS}>

			</div>
			
		</div>
	)
}

const guideWrapperCSS = css`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	margin-top: -500px;
`

const scene1CSS = css`
	padding:48px;
	background-image: url('/assets/guide/background3.jpg');
	background-size: cover;
	background-repeat: no-repeat;
    width: 100%;
    height: 0;
    padding-top: 100%;
`

