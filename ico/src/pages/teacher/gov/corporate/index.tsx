import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"

function index() {
	const router = useRouter()

	return (
		<div css={wrapperCSS}>
			<div css={titleWrapperCSS}>
				<h1>기업 관리</h1>
				<Button
					text={"기업 추가"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"normal"}
					onClick={() => router.push("/teacher/gov/corporate/create")}
				/>
			</div>
			<span css={descriptionCSS}>학생들이 운영할 기업을 생성하고 관리할 수 있습니다.</span>
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const titleWrapperCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const descriptionCSS = css`
	font-size: var(--teacher-h5);
`

export default index