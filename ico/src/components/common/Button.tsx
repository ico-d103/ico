import React from "react"
import { css } from "@emotion/react"

type ButtonPropsType = {
	text: string // 버튼 텍스트
	fontSize: string // 버튼 폰트사이즈
	width: string // 버튼 너비
	height?: string // 버튼 높이
	theme: string // 버튼 테마
}

type themeType = {
	border: string // 테마의 border
	borderRadius: string // 테마의 border-radius
	fontColor: string // 테마의 font-color
	backgroundColor: string // 테마의 background-color
}

function Button({ text, fontSize, width, height, theme }: ButtonPropsType) {
	// 원하는 버튼 테마 추가
	const themes: { [prop: string]: themeType } = {
		normal: {
			border: "none",
			borderRadius: "10px",
			fontColor: `var(--common-back-color-2)`,
			backgroundColor: `var(--teacher-main-color)`,
		},
		cancel: {
			border: "1px solid black",
			borderRadius: "10px",
			fontColor: `var(--common-back-color-2)`,
			backgroundColor: `var(--teacher-warning-color)`,
		},
		warning: {
			border: "1px solid black",
			borderRadius: "10px",
			fontColor: `var(--common-back-color-2)`,
			backgroundColor: `var(--teacher-highlight-color)`,
		},
	}

	return <button css={buttonCSS({ fontSize, width, height, themes, theme })}>{text}</button>
}

const buttonCSS = ({
	fontSize,
	width,
	height,
	themes,
	theme,
}: {
	fontSize: string
	width: string
	height: string | undefined
	themes: { [prop: string]: themeType }
	theme: string
}) => {
	return css`
		font-size: ${fontSize};
		width: ${width};
		height: ${height ? height : "40px"}; // 기본 height 40px
		border: ${themes[theme].border};
		border-radius: ${themes[theme].borderRadius};
		color: ${themes[theme].fontColor};
		background-color: ${themes[theme].backgroundColor};

		display: flex;
		justify-content: center;
		align-items: center;

		:hover {
			transition: all 0.2s;
			filter: brightness(120%);
		}
	`
}

export default Button
