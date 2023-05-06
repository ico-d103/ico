import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { css } from "@emotion/react"

function jobsearch() {
	return (
		<>
			<PageHeader title={"일자리 찾기"} />
			<div css={wrapperCSS}>
				<div css={contentCSS}>
					<span css={titleCSS}>
						현재 <b>&nbsp;5개</b>의 직업을 구인하고 있어요
					</span>
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

export default jobsearch
