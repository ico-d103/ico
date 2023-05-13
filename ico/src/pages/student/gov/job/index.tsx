import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import GovJobCard from "@/components/student/Gov/Job/GovJobCard"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus"
import { getGovJobAPI } from "@/api/teacher/gov/getGovJobAPI"
import { useQuery } from "@tanstack/react-query"
import { getGovJobType } from "@/types/teacher/apiReturnTypes"

function index() {
	const mockList = [
		{
			id: 0,
			student: "사공지은",
			name: "기상 캐스터",
			content: "학생들의 의견을 수렴하여 에어컨/히터의 온도를 조절하고 다음날 날씨를 알려주는 직업",
			grade: 6,
			money: 17000,
		},
		{
			id: 1,
			student: "담당자 미정",
			name: "소방관",
			content: "교실 내 소화기를 주기적으로 관리하는 직업",
			grade: 3,
			money: 20000,
		},
		{
			id: 2,
			student: "사공지은",
			name: "기상 캐스터",
			content: "학생들의 의견을 수렴하여 에어컨/히터의 온도를 조절하고 다음날 날씨를 알려주는 직업",
			grade: 6,
			money: 17000,
		},
	]

	const { data } = useQuery<getGovJobType[]>(["govJobList"], getGovJobAPI)

	return (
		<>
			<PageHeader title={"직업 목록"} addComp={<TabMenu menus={GovTabMenus()} selected={2} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<span css={titleCSS}>
						우리반에는
						<b>&nbsp;{data?.length ? data.length : 0}개</b>의 직업이 있어요
					</span>
					<div css={jobListCSS}>
						{data?.map((job) => (
							<GovJobCard key={job.id} job={job} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const contentCSS = css`
	width: 95%;
`

const titleCSS = css`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.1rem;

	> b {
		font-weight: bold;
		color: var(--student-main-color-5);
	}
`

const jobListCSS = css`
	margin-top: 30px;
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
	grid-column-gap: 10px;
	grid-row-gap: 20px;
	/* padding: 30px;
	width: 100%;
	background-color: var(--student-wrapper-color);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px; */
`

export default index
