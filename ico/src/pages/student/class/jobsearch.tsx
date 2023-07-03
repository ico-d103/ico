import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { css } from "@emotion/react"
import ClassJobSearchCard from "@/components/student/Class/JobSearch/ClassJobSearchCard"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { ClassTabMenus } from "@/components/student/Class/ClassTabMenus"
import { useEffect, useState } from "react"
import { getMyGradeAPI } from "@/api/student/class/getMyGradeAPI"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { getGovJobAPI } from "@/api/teacher/gov/getGovJobAPI"
import { getGovJobType } from "@/types/teacher/apiReturnTypes"
import { useQuery } from "@tanstack/react-query"

function jobsearch() {
	const [myGrade, setMyGrade] = useState<number>(-1)
	const { data } = useQuery<getGovJobType[]>(["govJobList"], getGovJobAPI)

	useEffect(() => {
		getMyGradeAPI().then((res) => {
			setMyGrade(res)
		})
	}, [])

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"우리반"} addComp={<TabMenu menus={ClassTabMenus()} selected={1} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					{data?.length === 0 ? (
						<div css={noneWrapperCSS}>
							<UseAnimations animation={alertCircle} size={200} strokeColor={"rgba(0,0,0,0.4)"} />
							<span css={titleCSS}>등록된 직업 목록이 없어요</span>
						</div>
					) : (
						<div css={jobListCSS}>
							{data?.map((job) => (
								<ClassJobSearchCard key={job.id} job={job} myGrade={myGrade} />
							))}
						</div>
					)}
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
	margin-top: 24px;

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
