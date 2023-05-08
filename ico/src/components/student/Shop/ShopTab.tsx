import { css } from "@emotion/react"
import { useRouter } from "next/router"

function ShopTab() {
	const router = useRouter()

	const goTeacherTab = () => {
		router.push("/student/shop/teacher")
	}
	const goStudentTab = () => {
		router.push("/student/shop/student")
	}

	const isTeacherTabSelected = router.pathname === "/student/shop/teacher"
	const isStudentTabSelected = router.pathname === "/student/shop/student"
	const isCreateSelected = router.pathname === "/student/shop/create"

	return (
		<div css={wrapperCSS}>
			<div css={[isTeacherTabSelected && selectedCSS] || [isCreateSelected && selectedCSS]} onClick={goTeacherTab}>
				선생님 상점
			</div>
			<div css={[isStudentTabSelected && selectedCSS]} onClick={goStudentTab}>
				우리들 상점
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 52px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;

	> div {
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

const selectedCSS = css`
	background-color: #ffffff62;
	border-radius: 10px 10px 0px 0px;
	border-bottom: 3px solid #ff9f00;
	font-weight: bold;
`

export default ShopTab
