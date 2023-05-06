import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { css } from "@emotion/react"
import ClassJobSearchCard from "@/components/student/Class/JobSearch/ClassJobSearchCard"
import useNavigate from "@/hooks/useNavigate"

function jobsearch() {
	const navigate = useNavigate()

	const mockList = [
		{ id: 0, name: "기상캐스터", need: 1 },
		{ id: 1, name: "소방관", need: 2 },
		{ id: 2, name: "한국 전력", need: 3 },
	]

	return (
		<>
			<PageHeader title={"일자리 찾기"} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<span css={titleCSS}>
						현재 <b>&nbsp;5개</b>의 직업을 구인하고 있어요
					</span>
					<div css={jobListCSS}>
						{mockList.map((mock) => (
							<ClassJobSearchCard key={mock.id} mock={mock} />
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
	padding: 30px 20px;
	width: 100%;
	background-color: var(--student-wrapper-color);
	border-radius: 10px;

	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
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
