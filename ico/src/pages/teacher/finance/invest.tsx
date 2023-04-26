import { css } from "@emotion/react"
import Button from "@/components/common/Button"
import InvestChart from "@/components/teacher/Invest/InvestChart"
import InvestForm from "@/components/teacher/Invest/InvestForm"

function invest() {
	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>투자</div>
				<Button text={"투자 종목 삭제"} fontSize={`var(--teacher-h5)`} width={"128px"} theme={"normal"} />
			</div>
			<div css={subTitleCSS}>투자 종목 설정을 설정하고 이슈를 등록해 투자 상품을 관리할 수 있습니다.</div>
			<InvestChart />
			<InvestForm />
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	height: 100%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const titleCSS = css`
	font-size: 2rem;
	font-weight: bold;
`

const subTitleCSS = css`
	font-size: 0.9rem;
`

export default invest
