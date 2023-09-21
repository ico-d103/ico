import React from "react"
import { css } from "@emotion/react"
import { removeCookie } from "@/api/cookie"
import useNavigate from "@/hooks/useNavigate"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import { getHomeMyInfoType } from "@/types/student/apiReturnTypes"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import useModal from "@/components/common/Modal/useModal"
import ModalContent from "@/components/common/Modal/ModalContent"
import { CLASS_BIG_PROPERTY } from "@/components/teacher/Class/ClassIcons"
import PowerCreditModalContent from "../../Job/Power/PowerCreditModalContent"
import PowerPropertyModalContent from "../../Job/Power/PowerPropertyModalContent"

function NavBarSideMenu({ data }: { data: getHomeMyInfoType }) {
	const creditModal = useModal()
	const propertyModal = useModal()
	const navigate = useNavigate()
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({ showMessage: false }).then((res) => {
			// console.log("여기에 할일")
		})
		// navigate("/teacher/login")
	}

	// 권한에 따라 보여줄지 말지에 대한 분기 처리 할것!
	const menu = [
		{
			content: (
				<img
					src={"/assets/dock/dock_class.png"}
					css={css`
						height: 100%;
						width: auto;
					`}
				/>
			),
			label: "국고 관리",
			function: () => propertyModal.open(),
		},
		{
			content: (
				<img
					src={"/assets/dock/dock_class.png"}
					css={css`
						height: 100%;
						width: auto;
					`}
				/>
			),
			label: "신용 점수 조정",
			function: () => creditModal.open(),
		},
		{
			content: (
				<img
					src={"/assets/dock/dock_class.png"}
					css={css`
						height: 100%;
						width: auto;
					`}
				/>
			),
			label: "도매 상점",
			function: () => {
				navigate("/student/job/seller", "bottomToTop")
			},
		},
		{
			content: (
				<img
					src={"/assets/dock/dock_class.png"}
					css={css`
						height: 100%;
						width: auto;
					`}
				/>
			),
			label: "학급 소식 관리",
			function: () => {
				navigate("/student/job/rule", "bottomToTop")
			},
		},
		{
			content: (
				<img
					src={"/assets/side_menu/student_logout.png"}
					css={css`
						height: 100%;
						width: auto;
					`}
				/>
			),
			label: "로그아웃",
			function: () => {
				signoutHandler()
			},
		},
	]

	const renderMenu = menu.map((el, idx) => {
		return (
			<div css={menuItemCSS} onClick={el.function} key={idx}>
				{el.content}
				{el.label}
			</div>
		)
	})

	return (
		<div
			css={menuWrapperCSS}
			onClick={(e) => {
				e.stopPropagation()
			}}
		>
			<div css={menuHeaderCSS}>
				<div css={welcomeSectionCSS}>
					<div>
						<div
							css={css`
								font-size: var(--student-h2);
							`}
						>
							{data.name}님 환영해요!
						</div>
						<div
							css={css`
								margin-top: 8px;
							`}
						>
							{data.school} {data.room}반 {data.number}번
						</div>
					</div>
					<LoadImage
						src={"/assets/dock/dock_gov.png"}
						alt={"deco"}
						wrapperCss={css`
							width: 64px;
							height: 64px;
						`}
					/>
				</div>

				<div
					css={css`
						display: flex;
						gap: 16px;
						margin-top: 16px;
					`}
				>
					<div
						css={labelButtonCSS}
						onClick={() => {
							navigate("/student/password", "bottomToTop")
						}}
					>
						비밀번호 변경
					</div>
				</div>
			</div>

			<div>{renderMenu}</div>

			{creditModal(
				<ModalContent
					width={"360px"}
					title={"신용 점수 조정"}
					titleSize={"var(--teacher-h2)"}
					content={<PowerCreditModalContent />}
				/>,
			)}

			{propertyModal(
				<ModalContent
					width={"360px"}
					title={"국고 관리"}
					titleSize={"var(--teacher-h2)"}
					content={<PowerPropertyModalContent />}
				/>,
			)}
		</div>
	)
}

const menuWrapperCSS = css`
	/* position: fixed; */
	width: 100%;
	height: 100%;
	/* max-width: 360px; */
	/* background-color: var(--student-main-color-soft); */
	/* box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2); */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: var(--student-main-color-soft);
`

const menuItemCSS = css`
	width: 100%;
	height: 64px;
	display: flex;
	/* justify-content: center; */
	align-items: center;
	gap: 16px;
	padding-left: 16px;
	font-size: var(--student-h2);
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	/* background-color: var(--student-main-color); */
`

const menuHeaderCSS = css`
	width: 100%;
	/* height: 15vh; */
	/* background-color: var(--student-main-color); */
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding: 32px;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	/* justify-content: space-between; */
`

const welcomeSectionCSS = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`

const labelButtonCSS = css`
	font-size: var(--student-h4);
	color: rgba(0, 0, 0, 0.6);
`

export default NavBarSideMenu
