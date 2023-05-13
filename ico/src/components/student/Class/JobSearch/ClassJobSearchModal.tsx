import { css } from "@emotion/react"
import { postResumeAPI } from "@/api/student/class/postResumeAPI"
import { appendEulReul } from "@/util/isEndWithConsonant"

type ClassJobSearchModalPropsType = {
	job: string
	id: number
	closeComp: () => void
}

function ClassJobSearchModal({ job, id, closeComp }: ClassJobSearchModalPropsType) {
	const applyJobHandler = () => {
		postResumeAPI({ id })
			.then((res) => {
				// 성공적으로 신청했다는 stackNotification 띄우기
				closeComp()
			})
			.catch((error) => {
				alert(error.response.message)
			})
	}

	return (
		<div css={wrapperCSS}>
			<div css={jobNameCSS}>
				<b>{job}</b>
				<span>{appendEulReul(job)} 선택했어요</span>
			</div>
			<div css={buttonWrapperCSS}>
				<button onClick={closeComp}>취소</button>
				<button onClick={applyJobHandler}>신청할래요 !</button>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	padding: 30px 20px;
	width: 300px;
	height: 190px;
	background: #ffffff;
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
`

const jobNameCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;

	> b {
		font-size: 1.1rem;
		font-weight: bold;
		color: var(--student-main-color-5);
	}

	> span {
		font-size: 1.1rem;
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 15px;

	> button {
		border-radius: 20px;
		padding: 10px 15px;
		font-size: var(--student-h3);
	}

	> button:nth-of-type(1) {
		background-color: rgba(199, 199, 199, 0.4);
		color: #828282;
	}

	> button:nth-of-type(2) {
		background-color: var(--student-main-color);
		color: var(--student-main-color-5);
		/* background-color: var(--student-main-color-3);
		color: var(--student-font-color); */
	}
`

export default ClassJobSearchModal
