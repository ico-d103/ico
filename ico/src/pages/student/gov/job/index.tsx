import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import GovJobCard from "@/components/student/Gov/Job/GovJobCard"
import TabMenu from "@/components/student/layout/TabMenu/TabMenu"
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus"
import { getGovJobAPI } from "@/api/teacher/gov/getGovJobAPI"
import { useQuery } from "@tanstack/react-query"
import { getGovJobType } from "@/types/teacher/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"

function index() {
	const { data } = useQuery<getGovJobType[]>(["govJobList"], getGovJobAPI)

	return (
		<div css={mainWrapperCSS}>
			<PageHeader title={"직업 목록"} addComp={<TabMenu menus={GovTabMenus()} selected={2} />} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<span css={titleCSS}>
						우리반에는
						<b>&nbsp;{data?.length ? data.length : 0}개</b>의 직업이 있어요
					</span>
					{data?.length === 0 ? (
						<div css={noneWrapperCSS}>
							<UseAnimations animation={alertCircle} size={200} strokeColor={"rgba(0,0,0,0.4)"} />
							<h3>등록된 직업 목록이 없어요</h3>
						</div>
					) : (
						<div css={jobListCSS}>
							{data?.map((job) => (
								<GovJobCard key={job.id} job={job} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	return {
		props: {},
	}
}

const mainWrapperCSS = css`
	padding-bottom: 16px;
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

export default index
