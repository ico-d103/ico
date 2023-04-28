import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"



export default function Home() {
	return (
		<div css={guideWrapperCSS}>
			<div css={imgWrapperCSS}>
				<LoadImage src={"/assets/guide/deco_1.jpg"} alt={"guide_deco"} useSkeleton={true} wrapperCss={illustCSS} />
			</div>	
			<div css={mainCommentCSS}>
				환영합니다!
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

const illustCSS = css`
	width: 60vw;
	height: 60vw;
`

const imgWrapperCSS = css`
	width: 50vw;
	height: 50vw;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	overflow: hidden;
	margin-bottom: 36px;
`

const mainCommentCSS = css`
	font-size: 48px;
`