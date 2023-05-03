import React from 'react'
import navigate from '@/util/navigate'
import { css } from "@emotion/react"
import LoadImage from '@/components/common/LoadImage/LoadImage'
import ShopCarousel from '@/components/teacher/Shop/ShopCarousel'

function test() {
  return (
    <div>
        test
        <div css={imgWrapperCSS}>
				<LoadImage src={"/assets/guide/deco_1.jpg"} alt={"guide_deco"} useSkeleton={true} wrapperCss={illustCSS} />
		</div>	
        <button onClick={() => {navigate('/student/test2', 'rightToLeft')}}>이동!</button>
		<div css={css`display: flex; width: 100%;`}>
			<div css={css`flex: 1;`}>
			<ShopCarousel/>
			</div>
		
		</div>
		

    </div>
  )
}

const illustCSS = css`
	width: 100%;
	height: 100%;
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

export default test