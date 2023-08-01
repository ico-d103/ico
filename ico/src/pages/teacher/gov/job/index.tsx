import React, { useMemo } from "react"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import Button from "@/components/common/Button/Button"
import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"
import { css } from "@emotion/react"
import FormCreator from "@/components/teacher/common/Form/FormCreator"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getGovJobAPI } from "@/api/teacher/gov/getGovJobAPI"
import { getGovPowerType, getGovJobType } from "@/types/teacher/apiReturnTypes"
import GovJobItem from "@/components/teacher/Gov/Job/GovJobItem"
import useGetNation from "@/hooks/useGetNation"
import { getGovJobAuthAPI } from "@/api/teacher/gov/getGovJobAuthAPI"
import { getGovPowerAPI } from "@/api/teacher/gov/getGovPowerAPI"

function index() {
	const [openComp, closeComp, compState] = useCompHandler()
	const [nation] = useGetNation()

	const jobsQuery = useQuery<getGovJobType>(
		["teacher", "govJob"],
		getGovJobAPI,
		// { staleTime: 200000 },
	)

	const powerQuery = useQuery<getGovPowerType[]>(
		["teacher", "govPower"],
		getGovPowerAPI,
		// { staleTime: 200000 },
	)





	

	const dummyStatus: string[] = []

	const dummyStatusList: {
		id: number
		name: string
	}[] = [
		
	]

	const dummyCert: { id: number; subject: string; rating: number }[] = [
		{
			id: 840,
			subject: "수학",
			rating: -1,
		},
		{
			id: 841,
			subject: "과학",
			rating: -1,
		},
		{
			id: 842,
			subject: "사회",
			rating: -1,
		},
		{
			id: 843,
			subject: "독서",
			rating: -1,
		},
		{
			id: 844,
			subject: "바른 글씨",
			rating: -1,
		},
		{
			id: 845,
			subject: "정리 정돈",
			rating: -1,
		},
		{
			id: 846,
			subject: "체력",
			rating: -1,
		},
		{
			id: 847,
			subject: "디자인",
			rating: -1,
		},
		{
			id: 848,
			subject: "저축",
			rating: -1,
		},
		{
			id: 849,
			subject: "운전면허",
			rating: -1,
		},
	]

	const dummyCertList: { id: number; subject: string; rating: number }[] = [
		{
			id: 840,
			subject: "수학",
			rating: 2,
		},
		{
			id: 841,
			subject: "과학",
			rating: 3,
		},
		{
			id: 842,
			subject: "사회",
			rating: -1,
		},
		{
			id: 843,
			subject: "독서",
			rating: -1,
		},
		{
			id: 844,
			subject: "바른 글씨",
			rating: -1,
		},
		{
			id: 845,
			subject: "정리 정돈",
			rating: -1,
		},
		{
			id: 846,
			subject: "체력",
			rating: -1,
		},
		{
			id: 847,
			subject: "디자인",
			rating: -1,
		},
		{
			id: 848,
			subject: "저축",
			rating: -1,
		},
		{
			id: 849,
			subject: "운전면허",
			rating: -1,
		},
	]

	const renderJobList = useMemo(() => powerQuery.data && jobsQuery.data && jobsQuery.data.jobList.map((el, idx) => {
				return (
					<div
						key={`${el.title}-${el.id}`}
						css={css`
							border-bottom: ${jobsQuery.data.jobList.length - 1 > idx && "1px solid rgba(0, 0, 0, 0.1)"};
						`}
					>
						<GovJobItem
							idx={el.id}
							title={el.title}
							detail={el.detail}
							salary={el.salary}
							creditRating={el.creditRating}
							color={el.color}
							image={el.image}
							total={el.total}
							count={el.count}
							currency={nation.currency}
							certification={dummyCertList}
							empowered={el.empowered}
							powerList={powerQuery.data}
						/>
					</div>
				)
			}), [jobsQuery.data && jobsQuery.data.jobList])
		

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
			<AnimatedRenderer compState={compState} initHeight="0">
				<div css={createWrapperCSS({ compState })}>
					<GovJobItem powerList={dummyStatusList} certification={dummyCert} closeHandler={closeComp} />
				</div>
			</AnimatedRenderer>

			<div
				css={css`
					border: 1px solid rgba(0, 0, 0, 0.1);
					border-radius: 10px;
				`}
			>
				{renderJobList}
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	return {
		props: {},
	}
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

const createWrapperCSS = ({ compState }: { compState: boolean }) => {
	return css`
		padding: 4px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		margin-bottom: 16px;
	`
}

export default index
