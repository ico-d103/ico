import React from 'react'
import useNavigate from '@/hooks/useNavigate'
import { css } from "@emotion/react"
import LoadImage from '@/components/common/LoadImage/LoadImage'

function test2() {
  const navigate = useNavigate()
  return (
    <div>
        test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2
        <div css={imgWrapperCSS}>
				<LoadImage src={"/assets/guide/deco_3.jpg"} alt={"guide_deco"} useSkeleton={true} wrapperCss={illustCSS} />
		</div>	
    <br/><br/><br/><br/><br/><br/><br/><br/>fdsafsdafsd<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
		<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>fdsfsdafdsdaf
		<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>fdsfsdafdsdaf
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button onClick={() => {navigate('/student/test3', 'scale')}}>이동!</button>
    </div>
  )
}

const illustCSS = css`
	width: 100%;
	height: 100%;
`

const imgWrapperCSS = css`
	width: 20vw;
	height: 13vw;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	overflow: hidden;
	margin-bottom: 36px;

`

export default test2