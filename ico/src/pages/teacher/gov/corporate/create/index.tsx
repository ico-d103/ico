import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"
import GovCorporateCreateContents from "@/components/teacher/Gov/Corporate/Create/GovCorporateCreateContents"
import useCompHandler from "@/hooks/useCompHandler"

function index() {
	const router = useRouter()

	const createCorporateHandler = () => {
		// valid 확인
		// 기업 생성 API

		alert("준비 중입니다.")
	}

	return (
		<div css={wrapperCSS}>
			<div css={titleWrapperCSS}>
				<h1>기업 추가</h1>
				<div>
					<Button
						text={"취소"}
						fontSize={"var(--teacher-h5)"}
						width={"110px"}
						theme={"cancelDark"}
						onClick={() => router.back()}
					/>
					<Button
						text={"기업 생성"}
						fontSize={"var(--teacher-h5)"}
						width={"110px"}
						theme={"normal"}
						onClick={createCorporateHandler}
					/>
				</div>
			</div>
			<GovCorporateCreateContents />
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
	margin-bottom: 35px;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
	}
`

export default index
