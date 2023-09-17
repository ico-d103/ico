import Button from "@/components/common/Button/Button"
import { css } from "@emotion/react"

function PowerPropertyModalContent() {
	return (
		<div>
			<div css={inputWrapperCSS}>
				<div>금액을 입력해주세요.</div>
				<input placeholder="ex) 2000" />
			</div>
			<div css={inputWrapperCSS}>
				<div>사용 종류를 입력해주세요.</div>
				<input placeholder="ex) 세금" />
			</div>
			<div css={inputWrapperCSS}>
				<div>사유를 입력해주세요.</div>
				<input placeholder="ex) 전기세, 자리세" />
			</div>
			<div css={buttonWrapperCSS}>
				<Button
					text={"출금하기"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"manageMinus"}
					onClick={() => {}}
				/>
				<Button
					text={"입금하기"}
					fontSize={"var(--teacher-h5)"}
					width={"110px"}
					theme={"mobileSoft3"}
					onClick={() => {}}
				/>
			</div>
		</div>
	)
}

const inputWrapperCSS = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 35px;

	> input {
		border-radius: 10px;
		background: #fffae2;
		padding: 10px 15px;
		outline: none;
		border: 1px solid var(--student-main-color-5);
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 20px;
	margin: 20px 0;
`

export default PowerPropertyModalContent
