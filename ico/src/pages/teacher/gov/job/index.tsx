import React, { useMemo } from "react"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import Button from "@/components/common/Button/Button"
import AnimatedRenderer from "@/components/common/AnimatedRenderer/AnimatedRenderer"
import { css } from "@emotion/react"
import FormCreator from "@/components/teacher/common/Form/FormCreator"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getGovJobAPI } from "@/api/teacher/gov/getGovJobAPI"
import {
	getGovPowerType,
	getGovJobType,
	getJobListType,
	jobLicenseListType,
	getLicenseType,
	getGovPaydayType,
} from "@/types/teacher/apiReturnTypes"
import GovJobItem from "@/components/teacher/Gov/Job/GovJobItem"
import useGetNation from "@/hooks/useGetNation"
import { getGovJobAuthAPI } from "@/api/teacher/gov/getGovJobAuthAPI"
import { getGovPowerAPI } from "@/api/teacher/gov/getGovPowerAPI"
import { getLicenseAPI } from "@/api/teacher/gov/getLicenseAPI"
import { getGovPaydayAPI } from "@/api/teacher/gov/getGovPaydayAPI"
import GovJobPayday from "@/components/teacher/Gov/Job/Payday/GovJobPayday"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"

function index() {
	const [openComp, closeComp, compState] = useCompHandler()
	const [nation] = useGetNation()

	const jobsQuery = useQuery<getJobListType>(
		["teacher", "govJob"],
		getGovJobAPI,
		// { staleTime: 200000 },
	)

	const powerQuery = useQuery<getGovPowerType[]>(
		["teacher", "govPower"],
		getGovPowerAPI,
		// { staleTime: 200000 },
	)

	const licenseQuery = useQuery<getLicenseType[]>(
		["teacher", "govLicense"],
		getLicenseAPI,
		// { staleTime: 200000 },
	)

	const paydayQuery = useQuery<getGovPaydayType>(
		["teacher", "govPayday"],
		getGovPaydayAPI,
		// { staleTime: 200000 },
	)





	const renderJobList = useMemo(
		() =>
			licenseQuery.data &&
			powerQuery.data &&
			jobsQuery.data &&
			jobsQuery.data.jobList.map((el, idx) => {
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
							wage={el.wage}
							creditRating={el.creditRating}
							color={el.color}
							image={el.image}
							total={el.total}
							count={el.count}
							currency={nation.currency}
							jobLicenseList={el.jobLicenseList}
							empowered={el.empowered}
							licenseList={licenseQuery.data}
							powerList={powerQuery.data}
						/>
					</div>
				)
			}),
		[jobsQuery.data && jobsQuery.data.jobList],
	)

	return (
		<React.Fragment>
			<CollapseMenu title={<span>월급 날짜 지정</span>} fontSize={"var(--teacher-h1)"} bracketSize={"18px"}>
				<React.Fragment>
					<div css={descCSS}>학생의 월급 수령일을 지정할 수 있습니다. (주의! 요일이 아닌 날짜 기준으로 지정됩니다.)</div>
					<GovJobPayday query={paydayQuery}/>
				</React.Fragment>
				
			</CollapseMenu>
		
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
					{powerQuery.data && licenseQuery.data && (
						<GovJobItem licenseList={licenseQuery.data} powerList={powerQuery.data} closeHandler={closeComp} />
					)}
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
		</React.Fragment>
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
