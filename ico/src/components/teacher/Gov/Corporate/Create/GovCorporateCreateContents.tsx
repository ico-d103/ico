import React from "react"
import { css } from "@emotion/react"
import GovCorporateCreateContent from "./GovCorporateCreateContent"

function GovCorporateCreateContents() {
	return (
		<div css={wrapperCSS}>
			<div>
				<GovCorporateCreateContent
					label={"기업명"}
					essential={true}
					placeholder={"기업명을 최대 10자 이내로 입력해주세요."}
					type={"corporate_name"}
				/>
				<GovCorporateCreateContent
					label={"기업 설명"}
					essential={true}
					placeholder={"기업에 대한 설명을 200자 이내로 입력해주세요."}
					type={"corporate_desc"}
				/>
				<GovCorporateCreateContent
					label={"기업 로고"}
					essential={true}
					placeholder={"기업 로고 사진을 등록해주세요."}
					type={"corporate_logo"}
				/>
				<GovCorporateCreateContent
					label={"CEO"}
					essential={true}
					placeholder={"CEO 학생 한 명을 입력해주세요."}
					type={"corporate_ceo"}
				/>
				<GovCorporateCreateContent
					label={"초기 자본금"}
					essential={true}
					placeholder={"초기 자본금을 숫자로 입력해주세요."}
					type={"corporate_capital"}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;

	> div {
		width: 90%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`

export default GovCorporateCreateContents
