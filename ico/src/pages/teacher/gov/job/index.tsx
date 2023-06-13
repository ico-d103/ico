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
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getGovJobAPI } from "@/api/teacher/gov/getGovJobAPI"
import { getGovJobType } from "@/types/teacher/apiReturnTypes"
import GovJobItem from "@/components/teacher/Gov/Job/GovJobItem"
import useGetNation from "@/hooks/useGetNation"


function index() {
	const [openComp, closeComp, compState] = useCompHandler()
	const [nation] = useGetNation()

	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getGovJobType[]>(
		["teacher", "govJob"],
		getGovJobAPI,
		// { staleTime: 200000 },
	)
	
	const renderJobList = data?.map((el, idx) => {
		return (
			<GovJobDetail actualIdx={el.id} job={el.title} description={el.detail} wage={el.wage} credit={el.creditRating} backgroundColor={el.color} imgUrl={el.image} total={el.total} count={el.count}/>
		)
	})


	const dummyCert = [
		{
			"id": 840,
			"subject": "수학",
			"rating": 2
		},
		{
			"id": 841,
			"subject": "과학",
			"rating": 3
		},
		{
			"id": 842,
			"subject": "사회",
			"rating": -1
		},
		{
			"id": 843,
			"subject": "독서",
			"rating": -1
		},
		{
			"id": 844,
			"subject": "바른 글씨",
			"rating": -1
		},
		{
			"id": 845,
			"subject": "정리 정돈",
			"rating": -1
		},
		{
			"id": 846,
			"subject": "체력",
			"rating": -1
		},
		{
			"id": 847,
			"subject": "디자인",
			"rating": -1
		},
		{
			"id": 848,
			"subject": "저축",
			"rating": -1
		},
		{
			"id": 849,
			"subject": "운전면허",
			"rating": -1
		}
	]

	const renderNewJobList = data?.map((el, idx) => {
		return (
			<div css={css`border-bottom: ${data.length - 1 > idx && '1px solid rgba(0, 0, 0, 0.1)'};`}>
				<GovJobItem job={el.title} description={el.detail} wage={el.wage} credit={el.creditRating} backgroundColor={el.color} imgUrl={el.image} total={el.total} count={el.count} currency={nation.currency} certification={dummyCert}/>
			</div>
			
		)
	})

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

			<FormCreator subComp={<GovJobCreate />} frontComp={<GovJobCardCreate />} showIdx={0} compState={compState} closeComp={closeComp} mainInit={{title: '', content: ''}} subInit={{wage: '0', backgroundColor: '#FF165C', imgUrl: '/assets/job/worker_male.png', credit: '0' }} />
			{/* <GovJobDetail job={'소방관'} description={'교실 내 소화기를 주기적으로 관리하는 직업'} wage={10000} credit={3} backgroundColor={'#FF165C'} imgUrl={'/assets/job/firefighter.png'} total={30} count={21}/>
			<GovJobDetail job={'기상 캐스터'} description={'학생들의 의견을 수렴하여 에어컨/히터의 온도를 조절하고 다음날 날씨를 알려주는 직업'} wage={12000} credit={4} backgroundColor={'#4A87FF'} imgUrl={'/assets/job/weather_caster.png'} total={3} count={1}/> */}
			
			
			{renderJobList}

			<div css={css`border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 10px;`}>
				{renderNewJobList}
			</div>
			
		</div>
	)
}

export async function getServerSideProps() {
	return {
	  props: {},
	};
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
