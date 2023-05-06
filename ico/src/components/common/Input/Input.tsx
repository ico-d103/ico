import React, { useState } from "react"
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type InputProps = {
	theme: string
	leftContent?: any
	rightContent?: any
	customCss: SerializedStyles
	css?: null
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({ theme, customCss, css, leftContent, rightContent, ...props }: InputProps) {
	const [isFocusing, setIsFocusing] = useState<boolean>(false)
	return (
		<div css={[inputWrapperCSS, themeProvider({isFocusing})[theme], customCss]} {...props}>
			{leftContent && <div css={leftContentWrapperCSS}>{leftContent}</div>}

			<input css={initInputCSS} {...props} onFocus={() => setIsFocusing(() => true)} onBlur={() => setIsFocusing(() => false)} />
			{rightContent && <div css={rightContentWrapperCSS}>{rightContent}</div>}
		</div>
	)
}

const initInputCSS = css`
	width: 100%;
	border: none;
	background-color: rgba(255, 255, 255, 0);
	padding: 12px;
	&:focus {
		outline: none;
	}
`

const themeProvider = ({isFocusing}: {isFocusing: boolean}) => {
	const themes: { [prop: string]: SerializedStyles } = {
		default: css`
			/* border: 2px solid rgba(0, 0, 0, 0.1); */
			border: none;
			background-color: rgb(230, 235, 240);
			border-radius: 10px;
			height: 42px;
			outline: ${isFocusing ? '4px solid rgba(0, 70, 150, 0.2)' : '2px solid rgba(0, 20, 50, 0.1)'};
			transition-duration: 0.15s;
			transition-property: outline ease;

			& input::placeholder {
				color: rgba(0, 20, 50, 0.5);
			}
		`,
	}

	return themes
}

const inputWrapperCSS = css`
	display: flex;
	align-items: center;
	overflow: hidden;
`

const leftContentWrapperCSS = css`
	/* padding-left: 12px; */
`

const rightContentWrapperCSS = css`
	right: 0;
	/* padding-right: 12px; */
`

export default Input
