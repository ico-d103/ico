import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"

function index() {
	const router = useRouter()
	const data = [] // 임시 data

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
			{data.length ? (
				// 기업 리스트 보여주기
				<></>
			) : (
				<div css={noneListCSS}>
					<UseAnimations animation={alertCircle} size={300} strokeColor={"rgba(0,0,0,0.4)"} />
					<h2>등록된 기업이 없습니다.</h2>
				</div>
			)}
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

const noneListCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h2 {
		font-size: var(--teacher-h2);
	}
`

export default index
