import React from "react"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import Button from "@/components/common/Button/Button"
import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"
import { css } from "@emotion/react"

import FormCreator from "@/components/teacher/common/Form/FormCreator"
import GovJobDetail from "@/components/teacher/Gov/Job/GovJobDetail"
import GovJobCreate from "@/components/teacher/Gov/Job/GovJobCreate"
import GovJobCardCreate from "@/components/teacher/Gov/Job/GovJobCardCreate"

function index() {
	const [openComp, closeComp, compState] = useCompHandler()
	return (
		<div css={contentWrapperCSS}>
			<div css={titleCSS}>
				직업 관리
				{!compState && (
					<Button
						text={"추가"}
						fontSize={"var(--teacher-h5)"}
						width={"110px"}
						theme={"normal"}
						onClick={() => {
							openComp()
						}}
					/>
				)}
			</div>
			<div css={descCSS}>학급의 직업 목록을 관리할 수 있습니다.</div>

			<FormCreator subComp={<GovJobCreate />} frontComp={<GovJobCardCreate />} idx={0} compState={compState} closeComp={closeComp} mainInit={{title: '', content: ''}} subInit={{wage: '0', backgroundColor: '#FF165C', imgUrl: '/assets/job/worker_male.png', credit: '0' }} />
			<GovJobDetail job={'소방관'} description={'교실 내 소화기를 주기적으로 관리하는 직업'} wage={10000} credit={3} backgroundColor={'#FF165C'} imgUrl={'/assets/job/firefighter.png'}/>
			<GovJobDetail job={'기상 캐스터'} description={'학생들의 의견을 수렴하여 에어컨/히터의 온도를 조절하고 다음날 날씨를 알려주는 직업'} wage={12000} credit={4} backgroundColor={'#4A87FF'} imgUrl={'/assets/job/weather_caster.png'}/>
		</div>
	)
}

const contentWrapperCSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const titleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: 700;
	margin-bottom: 12px;
	display: flex;
	justify-content: space-between;
	height: 35px;
`

const descCSS = css`
	margin-bottom: 36px;
	font-size: var(--teacher-h5);
`

export default index
