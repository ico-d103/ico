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
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"

function jobsearch() {
	const navigate = useNavigate()
	const [jobList, setJobList] = useState<getJobListType[]>([])
	const [myGrade, setMyGrade] = useState<number>(-1)
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)

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
					{jobList.length !== 0 && (
						<span
							css={[
								titleCSS,
								css`
									margin-top: 24px;
								`,
							]}
						>
							현재 <b>&nbsp;{jobList.length}개</b>의 직업이 사람을 구해요
						</span>
					)}
					{jobList.length === 0 && (
						<div css={noneWrapperCSS}>
							<UseAnimations animation={alertCircle} size={200} strokeColor={"rgba(0,0,0,0.4)"} />
							<span css={titleCSS}>
								현재 사람을 구하는 <b>&nbsp;직업</b>이 없어요!
							</span>
						</div>
					)}

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
						{isNavigatingAtom === false && <div css={floatingCSS}>직업 설명 자세히 볼래요</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

const mainWrapperCSS = css`
	padding-bottom: 30px;
	flex: 1;
	display: flex;
	flex-direction: column;
`

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
`

const contentCSS = css`
	width: 95%;
	flex: 1;
	display: flex;
	flex-direction: column;
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
	background-color: var(--student-main-color);
	color: var(--student-main-color-5);
	box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
`

const noneWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;

	> h3 {
		font-size: 1.1rem;
	}
`

export default jobsearch
