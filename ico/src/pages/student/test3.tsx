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
		<br/><br/><br/><br/><br/><br/><br/><br/>fdsafsdafsd<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
		<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>fdsfsdafdsdaf
		<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>fdsfsdafdsdaf
		<button onClick={() => {navigate('/student/test', 'scaleReverse')}}>이동!</button>

    </div>
  )
}

const illustCSS = css`
	width: 100%;
	height: 100%;
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