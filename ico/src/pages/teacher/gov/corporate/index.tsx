import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import GovCorporateCard from "@/components/teacher/Gov/Corporate/List/GovCorporateCard"

function index() {
	const router = useRouter()
	const mockData = [
		{
			id: 0,
			logo: "",
			name: "다이소",
			type: "소매업",
			ceo: "사공지은",
			content: "어서오세요 다이소입니다.",
			firstMoney: 1000,
			registNumber: "1234-1234",
		},
		{
			id: 1,
			logo: "",
			name: "장보고마트",
			type: "도매업",
			ceo: "변윤경",
			content: "어서오세요 장보고마트입니다.",
			firstMoney: 1000,
			registNumber: "1234-5678",
		},
		{
			id: 2,
			logo: "",
			name: "장보고마트",
			type: "도매업",
			ceo: "변윤경",
			content: "어서오세요 장보고마트입니다.",
			firstMoney: 1000,
			registNumber: "1234-5678",
		},
		{
			id: 3,
			logo: "",
			name: "장보고마트",
			type: "도매업",
			ceo: "변윤경",
			content: "어서오세요 장보고마트입니다.",
			firstMoney: 1000,
			registNumber: "1234-5678",
		},
		{
			id: 4,
			logo: "",
			name: "장보고마트",
			type: "도매업",
			ceo: "변윤경",
			content: "어서오세요 장보고마트입니다.",
			firstMoney: 1000,
			registNumber: "1234-5678",
		},
	]

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
			{mockData.length ? (
				<div css={listCSS}>
					<span>총 {mockData.length}개의 기업</span>
					<div>
						{mockData.map((corporate) => (
							<GovCorporateCard key={corporate.id} corporate={corporate} />
						))}
					</div>
				</div>
			) : (
				<div css={noneListCSS}>
					<UseAnimations animation={alertCircle} size={300} strokeColor={"rgba(0,0,0,0.4)"} />
					<span>등록된 기업이 없습니다.</span>
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

const listCSS = css`
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	gap: 30px;

	> span {
		color: #7f7f7f;
		font-size: var(--teacher-h4);
	}

	> div {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		grid-column-gap: 20px;
		grid-row-gap: 40px;
	}
`

const noneListCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> span {
		font-size: var(--teacher-h2);
	}
`

export default index
