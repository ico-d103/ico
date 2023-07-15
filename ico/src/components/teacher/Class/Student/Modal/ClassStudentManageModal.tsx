import { useState } from "react"
import { css } from "@emotion/react"
import { useAtom } from "jotai"
import { checkedStudent } from "@/store/store"
import ClassStudentDetailMoney from "../Detail/ClassStudentDetailMoney"
import Button from "@/components/common/Button/Button"
import ClassStudentManageGrade from "./ClassStudentManageGrade"
import ClassStudentDetailCertificateItem from "../Detail/ClassStudentDetailCertificateItem"

function ClassStudentManageModal() {
	const [openMoreMenu, setOpenMoreMenu] = useState<boolean>(false)
	const [checkedStudentAtom, setCheckedStudentAtom] = useAtom(checkedStudent)
	const license = [
		{
			id: 840,
			subject: "수학",
			rating: -1,
		},
		{
			id: 841,
			subject: "과학",
			rating: -1,
		},
		{
			id: 842,
			subject: "사회",
			rating: -1,
		},
		{
			id: 843,
			subject: "독서",
			rating: -1,
		},
		{
			id: 844,
			subject: "바른 글씨",
			rating: -1,
		},
		{
			id: 845,
			subject: "정리 정돈",
			rating: -1,
		},
		{
			id: 846,
			subject: "체력",
			rating: -1,
		},
		{
			id: 847,
			subject: "디자인",
			rating: -1,
		},
		{
			id: 848,
			subject: "저축",
			rating: -1,
		},
		{
			id: 849,
			subject: "운전면허",
			rating: -1,
		},
	]

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
				<div css={contentTopCSS}>
					<ClassStudentDetailMoney studentId={-1} manageAll={true} />
					<div css={divideCSS}></div>
					<ClassStudentManageGrade />
				</div>
				<button onClick={() => setOpenMoreMenu(!openMoreMenu)}>
					{openMoreMenu ? "자격증 관리 닫기" : "자격증 관리 열기"}
				</button>
				{openMoreMenu && (
					<div css={contentBottomCSS}>
						<div>
							{license.map((el) => (
								<ClassStudentDetailCertificateItem key={el.id} certificate={el} />
							))}
						</div>
						<Button
							text={"자격증 정보 수정"}
							fontSize={`0.9rem`}
							width={"130px"}
							height={"33px"}
							theme={"managePlus"}
							margin={"0 0 0 0"}
							onClick={() => alert("준비 중입니다.😀")}
						/>
					</div>
				)}
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
	flex-direction: column;

	> button {
		background: none;
		margin-top: 5px;
		font-size: var(--teacher-h5);
		transition: all 0.1s;

		:hover {
			font-weight: bold;
			color: var(--teacher-main-color);
		}
	}
`

const contentTopCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 20px 0;
`

const contentBottomCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	margin-top: 20px;

	> div {
		width: 90%;
		height: 230px;
		overflow: scroll;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`

const divideCSS = css`
	height: 30px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin: 0 20px;
`

export default ClassStudentManageModal
