import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { css } from "@emotion/react"
import ClassJobSearchCard from "@/components/student/Class/JobSearch/ClassJobSearchCard"
import useNavigate from "@/hooks/useNavigate"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ClassTabMenus } from "@/components/student/Class/ClassTabMenus"
import { getJobListAPI } from "@/api/student/class/getJobListAPI"
import { useEffect, useState } from "react"
import { getJobListType } from "@/types/student/apiReturnTypes"
import { getMyGradeAPI } from "@/api/student/class/getMyGradeAPI"

function jobsearch() {
	const navigate = useNavigate()
	const [jobList, setJobList] = useState<getJobListType[]>([])
	const [myGrade, setMyGrade] = useState<number>(-1)

	useEffect(() => {
		getJobListAPI().then((res) => {
			setJobList(res)
		})
		getMyGradeAPI().then((res) => {
			setMyGrade(res)
		})
	}, [])

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"일자리 찾기"} addComp={<TabMenu menus={ClassTabMenus()} selected={1} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<span css={titleCSS}>
						현재 <b>&nbsp;{jobList.length}개</b>의 직업을 구인하고 있어요
					</span>
					<div css={jobListCSS}>
						{jobList.map((job, idx) => (
							<ClassJobSearchCard key={idx} job={job} myGrade={myGrade} />
						))}
					</div>
					<div
						css={floatingWrapperCSS}
						onClick={() => {
							navigate("/student/gov/job")
						}}
					>
						<div css={floatingCSS}>직업 설명 자세히 볼래요</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 30px;
`

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
	/* padding: 30px 20px; */
	/* width: 100%; */
	/* background-color: var(--student-wrapper-color); */
	/* border-radius: 10px; */
	margin-top: 30px;
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
	grid-column-gap: 10px;
	grid-row-gap: 20px;
`

const floatingWrapperCSS = css`
	display: flex;
	justify-content: center;
`

const floatingCSS = css`
	background: rgba(0, 102, 255, 0.2);
	padding: 10px 20px;
	border-radius: 20px;
	position: fixed;
	bottom: 90px;
	background-color: var(--student-main-color-3);
	color: var(--student-font-color);
`

export default jobsearch
