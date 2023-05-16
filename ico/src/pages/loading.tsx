import { css } from "@emotion/react"

function loading() {
	return (
		<div css={wrapper}>
			<h2>로 딩 중</h2>
			<div css={spanWrapper}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	)
}

const wrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
	height: 100vh;

	> h2 {
		font-size: var(--teacher-h2);
	}
`

const spanWrapper = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 15px;

	> span {
		display: inline-block;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		animation: loading 1s 0s linear infinite;
	}

	> span:nth-of-type(1) {
		animation-delay: 0s;
		background-color: var(--teacher-main-color-op);
	}

	> span:nth-of-type(2) {
		animation-delay: 0.2s;
		background-color: var(--teacher-main-color-2);
	}

	> span:nth-of-type(3) {
		animation-delay: 0.4s;
		background-color: var(--teacher-main-color-3);
	}

	@keyframes loading {
		0%,
		100% {
			opacity: 0;
			transform: scale(0.5);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}
`

export default loading
