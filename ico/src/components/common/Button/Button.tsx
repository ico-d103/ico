import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type ButtonPropsType = {
	text: string
	fontSize: string
	width: string
	height?: string
	theme: string
	margin?: string
	onClick: (e: any) => void
	disabled?: boolean
	cssProps?: SerializedStyles
}

function Button({ text, fontSize, width, height, theme, margin, onClick, disabled, cssProps }: ButtonPropsType) {
	return (
		<button
			disabled={disabled}
			css={[initCSS({ fontSize, width, height, margin }), buttonCSS({ theme }), cssProps]}
			onClick={onClick}
		>
			{/* <button disabled={disabled} css={buttonCSS({ fontSize, width, height, themes, theme, margin })} onClick={onClick}></button> */}
			{text}
		</button>
	)
}

// const buttonCSS = ({
// 	fontSize,
// 	width,
// 	height,
// 	themes,
// 	theme,
// 	margin,
// }: {
// 	fontSize: string
// 	width: string
// 	height: string | undefined
// 	themes: { [prop: string]: themeType }
// 	theme: string
// 	margin?: string
// }) => {
// 	return css`
// 		font-size: ${fontSize};
// 		width: ${width};
// 		height: ${height ? height : "40px"}; // 기본 height 40px
// 		border: ${themes[theme].border};
// 		border-radius: ${themes[theme].borderRadius};
// 		color: ${themes[theme].fontColor};
// 		background-color: ${themes[theme].backgroundColor};
// 		margin: ${margin};
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		transition: all 0.2s;

// 		:hover:enabled {
// 			filter: brightness(120%);
// 		}

// 		:disabled {
// 			filter: brightness(60%);
// 			cursor: default;
// 		}
// 	`
// }

const buttonCSS = ({ theme }: { theme: string }) => {
	const themes: { [prop: string]: any } = {
		normal: css`
			border: none;
			border-radius: 10px;
			color: var(--common-back-color-2);
			background-color: var(--teacher-main-color);
		`,
		highlighted: css`
			border: none;
			border-radius: 10px;
			color: var(--common-back-color-2);
			background-color: var(--teacher-highlight-color);
		`,
		cancelLight: css`
			border: 1px solid rgba(255, 255, 255, 0.15);
			border-radius: 10px;
			color: var(--common-back-color-2);
			background-color: rgba(255, 255, 255, 0.1);
		`,
		cancelDark: css`
			border: none;
			border-radius: 10px;
			color: black;
			background-color: rgba(0, 0, 0, 0.1);
		`,
		warning: css`
			border: none;
			border-radius: 10px;
			color: var(--common-back-color-2);
			background-color: #d94a4a;
		`,
		mobileWarning: css`
			border: none;
			border-radius: 20px;
			color: var(--common-back-color-2);
			background-color: #d94a4a;
		`,
		positive: css`
			border: none;
			border-radius: 10px;
			color: var(--common-back-color-2);
			background-color: var(--teacher-blue-color);
		`,
		vividPositive: css`
			border: none;
			border-radius: 10px;
			color: var(--common-back-color-2);
			background-color: #1e7bff;
		`,
		vividNegative: css`
			border: none;
			border-radius: 10px;
			color: var(--common-back-color-2);
			background-color: #d94a4a;
		`,
		mobileVividPositive: css`
			border: none;
			border-radius: 20px;
			color: var(--common-back-color-2);
			background-color: #1e7bff;
		`,
		RadialPositive: css`
			border: none;
			border-radius: 10px;
			color: rgba(0, 20, 50, 1);
			background-color: rgba(0, 20, 50, 0.05);
		`,
		RadialPositiveMobile: css`
			border: none;
			border-radius: 10px;
			color: #9b6f00;
			background-color: rgba(0, 20, 50, 0.05);
		`,
		mobileNormal: css`
			border: none;
			border-radius: 20px;
			color: #3d2f21;
			background-color: #ffcd00;
		`,
		mobileSoft: css`
			border: 1px solid var(--student-main-color-5);
			border-radius: 20px;
			color: var(--student-main-color-5);
			background-color: var(--student-main-color);
		`,
		mobileSoft2: css`
			border: none;
			border-radius: 20px;
			background-color: #fff7d2;
			color: var(--student-main-color-5);
		`,
		mobileSoft3: css`
			border: none;
			border-radius: 20px;
			background-color: var(--student-main-color-7);
			color: var(--student-main-color-6);
		`,
		mobileCancel: css`
			border: 1px solid var(--student-main-color-5);
			border-radius: 20px;
			color: #c46200;
			background-color: rgba(0, 0, 0, 0);
		`,
		mobileRadial: css`
			border: none;
			border-radius: 100%;
			color: #3d2f21;
			background-color: #ffcd00;
			animation-name: first;
			animation-duration: 1s;
			animation-iteration-count: infinite;
			/* animation-delay: 0s, 0.3s; */
			animation-direction: alternate;
			position: relative;

			background: linear-gradient(45deg, #fa709a, #fee140);
			@keyframes first {
				from {
					transform: scale(70%);
				}

				to {
					transform: scale(100%);
					box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.5);
				}
			}
		`,
		managePlus: css`
			border: none;
			border-radius: 20px;
			background-color: var(--teacher-main-color-2);
			color: #ffffff;
		`,
		manageMinus: css`
			border: none;
			border-radius: 20px;
			background-color: var(--teacher-gray2-color);
			color: var(--teacher-gray3-color);
		`,
		text: css`
			border: none;
			background-color: rgba(0, 0, 0, 0);
			color: rgba(0, 0, 0, 0.6);
			transition-property: color;
			transition-duration: 0.3s;
			&:hover {
				color: rgba(0, 0, 0, 1);
			}
		`,
		white: css`
			border: none;
			border-radius: 10px;
			background-color: white;
			color: var(--teacher-gray3-color);
		`,
	}

	return themes[theme]
}

const initCSS = ({
	fontSize,
	width,
	height,
	margin,
}: {
	fontSize: string
	width: string
	height: string | undefined
	margin?: string
}) => {
	return css`
		font-size: ${fontSize};
		width: ${width};
		height: ${height ? height : "40px"}; // 기본 height 40px
		margin: ${margin};
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.2s;

		:hover:enabled {
			filter: brightness(95%) saturate(200%);
		}

		:disabled {
			filter: brightness(60%);
			opacity: 50%;
			cursor: default;
		}
	`
}

export default Button
