import React from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"

import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Button from "@/components/common/Button/Button"

function asset() {
	return (
		<React.Fragment>
            <div css={navBarOverlayCSS} className={'needClone'}>
                <Button text={"7일 단기 예금 가입"} fontSize={`var(--student-h3)`} width={"48%"} theme={"mobileSoft"} onClick={() => {}} />
                <Button text={"21일 장기 예금 가입"} fontSize={`var(--student-h3)`} width={"48%"} theme={"mobileNormal"} onClick={() => {}} />
            </div>
			<div>
				<PageHeader title={"예금"} />
				<div css={guideWrapperCSS}>
					<div css={mSizeFontCSS}>
						저희 예금 상품은 아래와 <br />
						같이 두가지가 있어요.
					</div>
					<div css={imageWrapperCSS}>
						<LoadImage
							src={"/assets/deposit/deposit_guide_1.png"}
							alt={"deposit_guide_1"}
							wrapperCss={firstImageWrapperCSS}
						/>
					</div>

					<div css={mSizeFontCSS}>오늘 7일 단기 예금 상품에 가입하면</div>
					<div css={sSizeFontCSS}>
						나의 신용등급 기준{" "}
						<span
							css={css`
								font-weight: 700;
							`}
						>
							8% 이자의
						</span>{" "}
						돈을 더 돌려받을 수 있어요.
					</div>
					<div css={imageWrapperCSS}>
						<LoadImage
							src={"/assets/deposit/deposit_guide_2.png"}
							alt={"deposit_guide_1"}
							wrapperCss={firstImageWrapperCSS}
						/>
					</div>
					<div css={mSizeFontCSS}>
						기다리는게 어렵지 않다구요?
						<br />
						그럼 21일 장기 예금 상품에 가입하면
					</div>
					<div css={sSizeFontCSS}>
						나의 신용등급 기준{" "}
						<span
							css={css`
								font-weight: 700;
							`}
						>
							14% 이자의
						</span>{" "}
						돈을 더 돌려받을 수 있어요.
					</div>
					<div css={imageWrapperCSS}>
						<LoadImage
							src={"/assets/deposit/deposit_guide_3.png"}
							alt={"deposit_guide_1"}
							wrapperCss={firstImageWrapperCSS}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

const navBarOverlayCSS = css`
    width: 100%;
    height: 64px;
    background-color: var(--student-main-color);
    position: fixed;
    bottom: 0;
    z-index: 999999999999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;

    opacity: 0%;
    animation: fadein 0.6s ease-in forwards;

    @keyframes fadein {
        from {
            opacity: 0%;
        }

        to {
            opacity: 100%;

        }
    }
`

const guideWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 24px;
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
	line-height: 130%;
	text-align: center;
`

const sSizeFontCSS = css`
	font-size: var(--student-h3);
	line-height: 150%;
`

const imageWrapperCSS = css`
	margin: 24px 0px 64px 0px;
`

const firstImageWrapperCSS = css`
	width: 50vw;
	height: 40vw;
`

export default asset
