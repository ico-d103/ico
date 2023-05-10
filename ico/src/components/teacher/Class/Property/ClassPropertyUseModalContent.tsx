import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"

type ClassPropertyUseModalPropsType = {
	closeComp: () => void
	isDepositMenuOpenAtom: boolean
}

function ClassPropertyUseModal({ closeComp, isDepositMenuOpenAtom }: ClassPropertyUseModalPropsType) {
	const currency = localStorage.getItem("currency")

	return (
		<>
			<div css={contentCSS}>
				<input
					type="text"
					placeholder={
						isDepositMenuOpenAtom ? `입금할 ${currency}를 입력해주세요.` : `출금할 ${currency}를 입력해주세요.`
					}
				/>
				<input type="text" placeholder={isDepositMenuOpenAtom ? `누가 입금하나요?` : `누가 출금하나요?`} />
				<textarea placeholder="사유를 입력해주세요."></textarea>
			</div>
			<div css={buttonWrapperCSS}>
				<Button
					text={isDepositMenuOpenAtom ? "입금" : "출금"}
					fontSize={`var(--teacher-h5)`}
					width={"200px"}
					theme={"positive"}
					onClick={() => {}}
				/>
				<Button text={"취소"} fontSize={`var(--teacher-h5)`} width={"200px"} theme={"cancelDark"} onClick={closeComp} />
			</div>
		</>
	)
}

const contentCSS = css`
	width: 100%;
	background-color: #d5dde9;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 20px;

	display: flex;
	flex-direction: column;

	> input {
		font-size: var(--teacher-h5);
		padding: 10px;
		background: none;
		border: none;
		outline: none;
		border-bottom: 1px solid rgba(138, 108, 108, 0.1);
	}

	> textarea {
		font-size: var(--teacher-h5);
		padding: 10px;
		resize: none;
		background: none;
		border: none;
		outline: none;
		height: 130px;
	}
`

const buttonWrapperCSS = css`
	display: flex;
	flex-direction: row;
	gap: 10px;
`

export default ClassPropertyUseModal
