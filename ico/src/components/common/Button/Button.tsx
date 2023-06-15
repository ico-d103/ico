import React from "react"
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type ButtonPropsType = {
	text: string // 버튼 텍스트
	fontSize: string // 버튼 폰트사이즈
	width: string // 버튼 너비
	height?: string // 버튼 높이
	theme: string // 버튼 테마
	margin?: string
	onClick: () => void // 버튼의 onClick 메서드
	disabled?: boolean
	cssProps?: SerializedStyles
}

type themeType = {
	border: string // 테마의 border
	borderRadius: string // 테마의 border-radius
	fontColor: string // 테마의 font-color
	backgroundColor: string // 테마의 background-color
}

function Button({ text, fontSize, width, height, theme, margin, onClick, disabled, cssProps }: ButtonPropsType) {
	// 원하는 버튼 테마 추가

	return (
		<button
			disabled={disabled}
			css={[initCSS({ fontSize, width, height, margin }), buttonCSS({ theme }), cssProps ]}
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
			border: none;
			border-radius: 20px;
			background-color: rgba(199, 199, 199, 0.4);
			color: #828282;
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
