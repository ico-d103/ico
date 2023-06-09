import Button from "@/components/common/Button/Button"
import { css } from "@emotion/react"

type GovJobCardModalContentPropsType = {
	content: string
	closeComp: () => void
}

function GovJobCardModalContent({ content, closeComp }: GovJobCardModalContentPropsType) {
	return (
		<div css={wrapperCSS}>
			<textarea readOnly value={content} />
			<Button text={"확인"} fontSize={"var(--student-h3)"} width={"130px"} theme={"mobileSoft2"} onClick={closeComp} />
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;

	> textarea {
		width: 286px;
		height: 118px;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 10px;
		resize: none;
		outline: none;
		border: none;
		padding: 15px;
	}
`

export default GovJobCardModalContent
