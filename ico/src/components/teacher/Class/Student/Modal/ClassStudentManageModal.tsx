import { css } from "@emotion/react"
import { useAtom } from "jotai"
import { checkedStudent } from "@/store/store"
import ClassStudentDetailMoney from "../Detail/ClassStudentDetailMoney"
import Button from "@/components/common/Button/Button"

function ClassStudentManageModal() {
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<span>
					{checkedStudentAtom.length <= 12
						? checkedStudentAtom.map((obj) => Object.values(obj)[0]).join(", ")
						: checkedStudentAtom
								.map((obj) => Object.values(obj)[0])
								.slice(0, 12)
								.join(", ")}{" "}
					{checkedStudentAtom.length === 1 ? "학생" : "학생들 "}
					{checkedStudentAtom.length > 12 && `외 ${checkedStudentAtom.length - 12}명`}에 대해
				</span>
				<button onClick={() => setCheckedStudentAtom([])}>닫기</button>
			</div>
			<div css={contentCSS}>
				{/* studentId는 임시 */}
				<ClassStudentDetailMoney studentId={-1} />
				<div css={divideCSS}></div>
				<span>신용 점수를</span>
				<Button
					text={"올릴게요"}
					fontSize={`var(--teacher-h6)`}
					width={"80px"}
					height={"30px"}
					theme={"managePlus"}
					margin={"0 10px 0 0"}
					onClick={(e) => e.stopPropagation()}
				/>
				<Button
					text={"내릴게요"}
					fontSize={`var(--teacher-h6)`}
					width={"80px"}
					height={"30px"}
					theme={"manageMinus"}
					onClick={(e) => e.stopPropagation()}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 55%;
	position: fixed;
	margin: 0 auto;
	top: 50px;
	left: 320px;
	right: 0;
	padding: 30px;
	border-radius: 10px;
	background-color: var(--common-back-color-2);
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
	z-index: 999999999;
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	> span {
		font-size: var(--teacher-h5);
		color: var(--teacher-gray-color);
	}

	> button {
		background: none;
		font-size: var(--teacher-h5);
		min-width: 40px;
		transition: all 0.2s;

		:hover {
			color: var(--teacher-gray-color);
		}
	}
`

const contentCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 20px;

	> span {
		font-size: var(--teacher-h5);
		color: var(--teacher-gray-color);
		margin-right: 15px;
	}
`

const divideCSS = css`
	height: 30px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin: 0 20px;
`

export default ClassStudentManageModal
