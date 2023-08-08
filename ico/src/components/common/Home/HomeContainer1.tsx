import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"
import useMediaQuery from "@/hooks/useMediaQuery"
import QRScanner from "@/components/student/Shop/QRScanner/QRScanner"
import { Container, setConditionType, useContainer } from "@/components/common/Container/useContainer"
import ContainerContent from "../Container/ContainerContent"
import useAnimator from "../Animator/useAnimator"

type HomeContainer1Type = {
  setCondition: setConditionType;
  currentStep: number;
  setStep: Function;
};

export default function HomeContainer1({
  setCondition,
  currentStep,
  setStep,
}: HomeContainer1Type) {
	const router = useRouter()
	const isMobile = useMediaQuery("(max-width: 768px")





	return (
		<ContainerContent css={containerWrapperCSS}>
			<div css={scene1CSS}/>
      <ContainerContent.Inner css={containerInnerWrapperCSS}>
					<div css={topWrapperCSS}>
					<div css={mainLabelCSS}>교실 속 작은 경제, 아이코</div>
					<div css={subLabelCSS}>함께 성장하는 우리 교실의 작은 경제를 체험해 보세요!</div>
					<div css={lineCSS} />
					</div>
					
					<div css={buttonWrapperCSS}>
						
							<Button
								theme={"highlighted"}
								width={"240px"}
								height={"84px"}
								text={"로그인"}
								fontSize={"var(--teacher-h2)"}
								onClick={() => {
									router.push("/login")
								}}
							></Button>
					
					</div>
					

			</ContainerContent.Inner>
		</ContainerContent>
	)

	// return (

		
	// 	<div css={guideWrapperCSS}>
	// 		<div css={scene1CSS}>
				
	// 		</div>
	// 	</div>
	// )
}

const containerWrapperCSS = css`
	overflow: hidden;
`

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

const topWrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`



const mainLabelCSS = css`
	font-size: 5vw;
	position: relative;
	animation: scale 1s ease forwards;
	margin-bottom: 2vw;
	opacity: 0%;
	color: white;

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
	color: white;

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

const lineCSS = css`
	margin-top: 24px;
	margin-bottom: 10vh;
	width: 70%;
	height: 1px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const buttonWrapperCSS = css`
	display: flex;
	gap: 16px;
`

const containerInnerWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

`
