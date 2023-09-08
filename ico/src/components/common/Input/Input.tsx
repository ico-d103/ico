import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/react"

type InputProps = {
	theme: string
	leftContent?: any
	rightContent?: any
	customCss?: SerializedStyles | SerializedStyles[]
	textAlign?: "left" | "right" | "center"
	isFile?: boolean
	css?: null
	isTextarea?: boolean
	resizeTextarea?: boolean
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

const Input = React.forwardRef(
	(
		{
			theme,
			customCss,
			css,
			textAlign,
			leftContent,
			rightContent,
			isFile,
			isTextarea,
			resizeTextarea = true,
			...props
		}: InputProps,
		ref: React.ForwardedRef<HTMLInputElement>,
	) => {
		const [isFocusing, setIsFocusing] = useState<boolean>(false)

		const textareaRef = useRef<HTMLTextAreaElement>(null)
		const divRef = useRef<HTMLDivElement>(null)

		const resizeHeightHandler = () => {
			if (textareaRef.current && divRef.current && resizeTextarea) {
				textareaRef.current.style.height = "auto"
				textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
				divRef.current.style.height = textareaRef.current.scrollHeight + "px"
			}
		}

		useEffect(() => {
			if (resizeTextarea) {
				resizeHeightHandler()
			}
		}, [])

		return (
			// div에 {...props}이 있었는데 왜 있었는지 모르겠음...
			<div css={[themeProvider({ isFocusing })[theme], customCss]} ref={divRef}>
				<label css={initLabelCSS}>
					{leftContent && (
						<div css={leftContentWrapperCSS} className={"left-content"}>
							{leftContent}
						</div>
					)}

					{isTextarea === true ? (
						<textarea
							css={[initInputCSS({ isFile, textAlign }), initTextAreaCSS]}
							{...props}
							onFocus={() => setIsFocusing(() => true)}
							onBlur={() => setIsFocusing(() => false)}
							onInput={resizeHeightHandler}
							ref={textareaRef}
							// ref={ref}
						/>
					) : (
						<input
							css={initInputCSS({ isFile, textAlign })}
							{...props}
							onFocus={() => setIsFocusing(() => true)}
							onBlur={() => setIsFocusing(() => false)}
							ref={ref}
						/>
					)}

					{rightContent && (
						<div css={rightContentWrapperCSS} className={"right-content"}>
							{rightContent}
						</div>
					)}
				</label>
			</div>
		)
	},
)

const initTextAreaCSS = css`
	padding: 12px;
	resize: none;
`

const initInputCSS = ({ isFile, textAlign }: { isFile?: boolean; textAlign?: "left" | "right" | "center" }) => {
	return css`
		flex: 1;
		/* width: 100%; */
		border: none;
		min-width: 0px;

		background-color: rgba(255, 255, 255, 0);
		padding: 0px 12px 0px 12px;
		height: 100%;
		display: ${isFile && "none"};
		&:focus {
			outline: none;
		}
		text-align: ${textAlign};

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	`
}

const initLabelCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	flex-wrap: nowrap;
	/* background-color: red; */
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
			& textarea::placeholder {
				color: rgba(0, 20, 50, 0.5);
			}
		`,
		greenDefault: css`
			/* border: 2px solid rgba(0, 0, 0, 0.1); */
			border: none;
			background-color: rgb(230, 240, 235);
			border-radius: 10px;
			height: 42px;
			outline: ${isFocusing ? "4px solid rgba(0, 150, 70, 0.2)" : "2px solid rgba(0, 50, 20, 0.1)"};
			transition-duration: 0.15s;
			transition-property: outline ease;

			& input::placeholder {
				color: rgba(0, 50, 20, 0.5);
			}
			& textarea::placeholder {
				color: rgba(0, 50, 20, 0.5);
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
			& textarea {
				font-size: var(--student-h3);
			}
			& textarea::placeholder {
				color: #9b6f00c9;
			}
		`,
		mobileWhite: css`
			/* border: 2px solid rgba(0, 0, 0, 0.1); */
			border: none;
			background-color: white;
			border-radius: 10px;
			height: 42px;
			outline: ${isFocusing ? "4px solid var(--student-main-color-2)" : "2px solid rgba(0, 0, 0, 0.1)"};
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
			& textarea {
				font-size: var(--student-h3);
			}
			& textarea::placeholder {
				color: #9b6f00c9;
			}
		`,
		mobileSoft: css`
			/* border: 2px solid rgba(0, 0, 0, 0.1); */
			border: none;
			background-color: var(--student-main-color-soft);
			border-radius: 10px;
			height: 42px;
			outline: ${isFocusing ? "4px solid var(--student-main-color-2)" : "2px solid rgba(0, 0, 0, 0.1)"};
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
			& textarea {
				font-size: var(--student-h3);
			}
			& textarea::placeholder {
				color: #9b6f00c9;
			}
		`,
		titleNoTheme: css`
			height: 42px;

			& input {
				font-size: 18px;
			}
		`,
		radial: css`
			height: 32px;
			border-radius: 10px;
			background-color: rgba(255, 255, 255, 0.5);
			overflow: hidden;
			border: 1px solid rgba(0, 0, 0, 0.1);

			transition-property: background-color;
			transition-duration: 0.2s;

			& div {
				cursor: pointer;
				user-select: none;
			}

			&:hover {
				background-color: rgba(255, 255, 255, 1);
			}

			& label .left-content {
				/* background-color: rgba(0, 0, 0, 0.05); */
				height: 100%;
				display: flex;
				align-items: center;
				padding: 8px;
				color: rgba(0, 0, 0, 1);
				border-right: 1px solid rgba(0, 0, 0, 0.1);
			}

			& label .right-content {
				height: 100%;
				display: flex;
				align-items: center;
				padding: 8px 8px 8px 0px;
				color: rgba(0, 0, 0, 0.5);
			}

			& input {
				text-align: right;
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
