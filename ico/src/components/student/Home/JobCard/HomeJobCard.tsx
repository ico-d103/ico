import React from "react"
import Image from "next/image"
import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"

type HomeJobCardProps = {
  name: string
	job?: string
	wage?: number
  credit: number
	backgroundColor: string
	imgUrl: string
}

function HomeJobCard({name, job, wage, credit, backgroundColor, imgUrl }: HomeJobCardProps) {
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
          <div css={nameIndicatorCSS}>{name}</div>
          <div css={jobTextCSS}>{job ? job : '직업이 없어요.'}</div>
          <div css={lineCSS}/>
          <div css={secondaryInfoWrapperCSS}>
            <div css={creditIndicatorCSS}>{credit}등급</div>
            <div css={wageTextCSS}>{wage ? `약 ${wage * 30 / 10000}만`: ''}</div>
          </div>
        </div>
			</div>
		</div>
	)
}

const outerCardWrapperCSS = css`
  width: 100%;
  /* min-width: 390px; */
	height: 180px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 16px; */
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-right: 16px;
  margin-top: 52px;
`

const shadowMakerCSS = css`
  position: absolute;
  /* z-index: 9999999; */
  /* background-color: black; */
  width: 80%;
  height: 10%;
  bottom: 0px;
  border-radius: 100% / 100% 100% 100% 100%;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.5); 
`

const cardWrapperCSS = ({ backgroundColor }: { backgroundColor: string }) => {
	return css`
    transition-property: background-color;
    transition-duration: 0.3s;
		background-color: ${backgroundColor};
		position: absolute;
		width: 100%;
		height: 180px;
		border-radius: 10px;
    display: flex;
    
	`
}

const jobImgSpaceCSS = css`
	width: 110px;
	height: 100%;
  
`

const jobImgWrapperCSS = css`
	position: absolute;
	top: -45px;
	left: 15px;
	width: 120px;
	height: 210px;
	/* background-color: gray; */
`

const imgCSS = css`
	width: 100%;
  height: 100%;
  
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2)) ;
`

const contentWrapperCSS = css`
  margin-top: 30px;
  padding-right: 24px;
  flex: 1;

  display: flex;
  flex-direction: column;
`

const nameIndicatorCSS = css`
  font-size: var(--teacher-h2);
  /* color: rgba(255, 255, 255, 0.5); */
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
`

const jobTextCSS = css`
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;

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
  /* flex-direction: column; */
  justify-content: space-between;
`

const wageTextCSS = css`
  color: rgba(255, 255, 255, 1);
  margin-bottom: 16px;
`

export default HomeJobCard
