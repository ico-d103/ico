import { css } from "@emotion/react"
import { CLASS_JOB_SEARCH } from "@/components/teacher/Class/ClassIcons"
import ClassJobSearchList from "@/components/teacher/Class/JobSearch/ClassJobSearchList"
import { getJobListAPI } from "@/api/teacher/class/getJobListAPI"
import { useQuery } from "@tanstack/react-query"
import { getJobListType } from "@/types/teacher/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"

function jobsearch() {
	const { data, isLoading } = useQuery<getJobListType>(["jobList"], getJobListAPI)

	return (
		<div css={wrapperCSS}>
			<h1>구인 구직</h1>
			<div css={titleCSS}>
				<div>{CLASS_JOB_SEARCH}</div>
				<div>
					현재 구직 중인 직업은 <b>{data?.restJobCount}개</b>입니다.
				</div>
			</div>
			{isLoading || data?.jobList.length === 0 ? (
				<div css={noneWrapperCSS}>
					<UseAnimations animation={alertCircle} size={300} strokeColor={"rgba(0,0,0,0.4)"} />
					<h1>현재 구직 중인 직업이 없습니다.</h1>
				</div>
			) : (
				<ClassJobSearchList jobList={data ? data.jobList : []} />
			)}
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const noneWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h1 {
		font-size: var(--teacher-h2);
	}
`

const titleCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 30px;

	> div:nth-of-type(1) {
		margin-right: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	> div:nth-of-type(2) {
		font-size: var(--teacher-h2);

		> b {
			font-weight: bold;
			color: var(--teacher-main-color);
		}
	}
`

export default jobsearch
