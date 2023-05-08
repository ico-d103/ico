import React, { useState } from "react"
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type InputProps = {
	theme: string
	leftContent?: any
	rightContent?: any
	customCss?: SerializedStyles
	textAlign?: 'left' | 'right' | 'center'
	isFile?: boolean
	css?: null
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef(
	(
		{ theme, customCss, css, textAlign, leftContent, rightContent, isFile, ...props }: InputProps,
		ref: React.ForwardedRef<HTMLInputElement>,
	) => {
		const [isFocusing, setIsFocusing] = useState<boolean>(false)
		return (
			<div css={[themeProvider({ isFocusing })[theme], customCss]} {...props}>
				<label css={initLabelCSS}>
					{leftContent && <div css={leftContentWrapperCSS}>{leftContent}</div>}

					<input
						css={initInputCSS({ isFile, textAlign })}
						{...props}
						onFocus={() => setIsFocusing(() => true)}
						onBlur={() => setIsFocusing(() => false)}
						ref={ref}
					/>

					{rightContent && <div css={rightContentWrapperCSS}>{rightContent}</div>}
				</label>
			</div>
		)
	},
)

const initInputCSS = ({ isFile, textAlign }: { isFile?: boolean, textAlign?: 'left' | 'right' | 'center'  }) => {
	return css`
		flex: 1;
		/* width: 100%; */
		border: none;
		background-color: rgba(255, 255, 255, 0);
		padding: 12px;
		display: ${isFile && "none"};
		&:focus {
			outline: none;
		}
		text-align: ${textAlign};
	`
}

const initLabelCSS = css`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	flex-wrap: nowrap;
`

const themeProvider = ({ isFocusing }: { isFocusing: boolean }) => {
	const themes: { [prop: string]: SerializedStyles } = {
		default: css`
			/* border: 2px solid rgba(0, 0, 0, 0.1); */
			border: none;
			background-color: rgb(230, 235, 240);
			border-radius: 10px;
			height: 42px;
			outline: ${isFocusing ? "4px solid rgba(0, 70, 150, 0.2)" : "2px solid rgba(0, 20, 50, 0.1)"};
			transition-duration: 0.15s;
			transition-property: outline ease;

			& input::placeholder {
				color: rgba(0, 20, 50, 0.5);
			}
		`,
		mobileDefault: css`
		/* border: 2px solid rgba(0, 0, 0, 0.1); */
		border: none;
		background-color: var(--student-main-color);
		border-radius: 10px;
		height: 42px;
		outline: ${isFocusing ? "4px solid var(--student-main-color-5)" : "2px solid rgba(0, 0, 0, 0.1)"};
		transition-duration: 0.15s;
		transition-property: outline ease;
		
		& input {
			font-size: var(--student-h3);
		}
		& div path {
			stroke: #9b6f007d;
		}
		& input::placeholder {
			color: #9b6f00c9;
		}
	`,
	}

	return themes
}

const leftContentWrapperCSS = css`
	overflow: hidden;
`

const rightContentWrapperCSS = css`
	right: 0;
`

export default Input
