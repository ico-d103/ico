import React from 'react'
import navigate from '@/util/navigate'
import { css } from "@emotion/react"
import LoadImage from '@/components/common/LoadImage/LoadImage'

function test3() {
  return (
    <div>
        test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2
        <div css={imgWrapperCSS}>
				<LoadImage src={"/assets/guide/deco_2.jpg"} alt={"guide_deco"} useSkeleton={true} wrapperCss={illustCSS} />
		</div>	
		<button onClick={() => {navigate('/student/test', 'rightToLeft')}}>이동!</button>

    </div>
  )
}

const illustCSS = css`
	width: 60vw;
	height: 60vw;
`

const imgWrapperCSS = css`
	width: 40vw;
	height: 40vw;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	overflow: hidden;
	margin-bottom: 36px;
`

export default test3