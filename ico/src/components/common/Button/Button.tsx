import React from "react"
import { css } from "@emotion/react"

type ButtonPropsType = {
	text: string // 버튼 텍스트
	fontSize: string // 버튼 폰트사이즈
	width: string // 버튼 너비
	height?: string // 버튼 높이
	theme: string // 버튼 테마
	margin?: string
	onClick: () => void // 버튼의 onClick 메서드
}

type themeType = {
	border: string // 테마의 border
	borderRadius: string // 테마의 border-radius
	fontColor: string // 테마의 font-color
	backgroundColor: string // 테마의 background-color
}

function Button({ text, fontSize, width, height, theme, margin, onClick }: ButtonPropsType) {
	// 원하는 버튼 테마 추가
	const themes: { [prop: string]: themeType } = {
		normal: {
			border: "none",
			borderRadius: "10px",
			fontColor: `var(--common-back-color-2)`,
			backgroundColor: `var(--teacher-main-color)`,
		},
		highlighted: {
			border: "none",
			borderRadius: "10px",
			fontColor: `var(--common-back-color-2)`,
			backgroundColor: `var(--teacher-highlight-color)`,
		},
		cancelLight: {
			border: "1px solid rgba(255, 255, 255, 0.15)",
			borderRadius: "10px",
			fontColor: `var(--common-back-color-2)`,
			backgroundColor: `rgba(255, 255, 255, 0.1)`,
		},
		cancelDark: {
			border: "none",
			borderRadius: "10px",
			// fontColor: `var(--common-back-color-2)`,
			fontColor: "black",
			backgroundColor: `rgba(0, 0, 0, 0.1)`,
		},
		warning: {
			border: "none",
			borderRadius: "10px",
			fontColor: `var(--common-back-color-2)`,
			backgroundColor: `#D94A4A`,
		},
		positive: {
			border: "none",
			borderRadius: "10px",
			fontColor: `var(--common-back-color-2)`,
			backgroundColor: `var(--teacher-blue-color)`,
		},
		mobileNormal: {
			border: "none",
			borderRadius: "20px",
			fontColor: `#3D2F21`,
			backgroundColor: `#FFCD00`,

		},
	}

	return (
		<button css={buttonCSS({ fontSize, width, height, themes, theme, margin })} onClick={onClick}>
			{text}
		</button>
	)
}

const buttonCSS = ({
	fontSize,
	width,
	height,
	themes,
	theme,
	margin,
}: {
	fontSize: string
	width: string
	height: string | undefined
	themes: { [prop: string]: themeType }
	theme: string
	margin?: string
}) => {
	return css`
		font-size: ${fontSize};
		width: ${width};
		height: ${height ? height : "40px"}; // 기본 height 40px
		border: ${themes[theme].border};
		border-radius: ${themes[theme].borderRadius};
		color: ${themes[theme].fontColor};
		background-color: ${themes[theme].backgroundColor};
		margin: ${margin};
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.2s;
		
		:hover {
			filter: brightness(120%);
		}
	`
}

export default Button
