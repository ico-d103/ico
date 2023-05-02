import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"

export default function Home() {
	return (
		<div css={guideWrapperCSS}>
			<div css={scene1CSS}>
				<div css={scene1InnerCSS}>
					<div css={mainLabelCSS}>교실 속 작은 경제, 아이코</div>
					<div css={subLabelCSS}>무슨 말을 할까~ 뿡빵아 도와줘~!</div>
					<img src={'/assets/guide/14.jpg'} css={css`width: 200px; height: auto; position: absolute; top: 70%;`}/>
				</div>
			</div>
		</div>
	)
}

const guideWrapperCSS = css``

const scene1CSS = css`
	position: relative;
	
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-image: url(graphic-to-be-filtered.jpg);
		background-image: url("/assets/guide/background4.jpg");
		background-size: cover;
		filter: brightness(50%);
	}
`

const scene1InnerCSS = css`
	position: relative;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: white;

	@font-face {
		font-family: 'NEXON Lv1 Gothic OTF';
		src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}
	font-family: 'NEXON Lv1 Gothic OTF';
	
	`

const mainLabelCSS = css`
	font-size: 5vw;
	position: relative;
	animation: scale 1s ease forwards;
	margin-bottom: 2vw;
	opacity: 0%;

	@keyframes scale {
		from {
			opacity: 0%;
			transform: translate(0px, 100px);

			visibility: visible;
		}

		to {
			opacity: 100%;
			transform: translate(0px, 0px);
		}
	}
`

const subLabelCSS = css`
	font-size: 3vw;
	position: relative;
	animation: scale 1s ease forwards;
	-webkit-animation-delay: 1s;
	opacity: 0%;

	@keyframes scale {
		from {
			opacity: 0%;
			transform: translate(0px, 100px);

			visibility: visible;
		}

		to {
			opacity: 100%;
			transform: translate(0px, 0px);
		}
	}
`
