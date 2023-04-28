import React from "react"
import Image from "next/image"
import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"

type GovJobCardProps = {
	job: string
	wage: number
	backgroundColor: string
	imgUrl: string
}

function GovJobCard({ job, wage, backgroundColor, imgUrl }: GovJobCardProps) {
	return (
		<div css={outerCardWrapperCSS}>
      <div css={shadowMakerCSS}/>

			<div css={cardWrapperCSS({ backgroundColor })}>
				<div css={jobImgSpaceCSS} />
				<div css={jobImgWrapperCSS}>
					<LoadImage
						wrapperCss={imgCSS}
						src={imgUrl}
						alt={"job_image"}
            // useSkeleton={true}
						// priority={true}
						// layout="fill"
						// objectFit="contain"
						// objectPosition="left"
					/>
				</div>
        <div css={contentWrapperCSS}>
          <div css={nameIndicatorCSS}>학생 이름</div>
          <div css={jobTextCSS}>{job}</div>
          <div css={lineCSS}/>
          <div css={secondaryInfoWrapperCSS}>
            <div css={creditIndicatorCSS}>현재 신용등급</div>
            <div css={wageTextCSS}>약 {wage * 30 / 10000}만</div>
          </div>
        </div>
			</div>
		</div>
	)
}

const outerCardWrapperCSS = css`
  width: 390px;
  min-width: 390px;
	height: 240px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 16px; */
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-right: 16px;
`

const shadowMakerCSS = css`
  position: absolute;
  /* z-index: 9999999; */
  /* background-color: black; */
  width: 80%;
  height: 10%;
  bottom: 20px;
  border-radius: 100% / 100% 100% 100% 100%;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.5); 
`

const cardWrapperCSS = ({ backgroundColor }: { backgroundColor: string }) => {
	return css`
    transition-property: background-color;
    transition-duration: 0.3s;
		background-color: ${backgroundColor};
		position: absolute;
		width: 350px;
		height: 200px;
		border-radius: 10px;
    display: flex;
    
	`
}

const jobImgSpaceCSS = css`
	width: 130px;
	height: 100%;
  
`

const jobImgWrapperCSS = css`
	position: absolute;
	top: -30px;
	left: 10px;
	width: 150px;
	height: 220px;
	/* background-color: gray; */
`

const imgCSS = css`
	width: 100%;
  height: 100%;
  
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2)) ;
`

const contentWrapperCSS = css`
  margin-top: 40px;
  padding-right: 24px;
  flex: 1;

  display: flex;
  flex-direction: column;
`

const nameIndicatorCSS = css`
  font-size: var(--teacher-h2);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
`

const jobTextCSS = css`
  color: rgba(255, 255, 255, 1);
  margin-top: 5px;

`

const lineCSS = css`
  width: 100%;
  height: 1px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  margin: 10px 0px 10px 0px;
`

const creditIndicatorCSS = css`
  color: rgba(255, 255, 255, 0.6);
`

const secondaryInfoWrapperCSS = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const wageTextCSS = css`
  color: rgba(255, 255, 255, 1);
  margin-bottom: 16px;
`

export default GovJobCard
