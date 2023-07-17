import React, {ReactNode} from "react"
import { SerializedStyles, css } from "@emotion/react"

type CheckBoxProps = {
	label?: any
	customCss?: SerializedStyles | SerializedStyles[]
	css?: null
  children?: ReactNode
  childDir?: 'left' | 'right'
} & React.InputHTMLAttributes<HTMLInputElement>

function CheckBox({children, customCss, childDir = 'right', ...props  }: CheckBoxProps) {

	return (
		<div css={Array.isArray(customCss)
      ? [checkCSS, ...customCss]
      : [checkCSS, customCss] }>
      {childDir === 'left' && children}
			<input {...props} type="checkbox" />
      {childDir === 'right' && children}
			

		</div>
	)
}

const checkCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;


	> input {
		width: 23px;
		height: 23px;
		cursor: pointer;
		border-radius: 50%;
		border: 1px solid #999;
		appearance: none;
		transition: background 0.2s;

		:checked {
			background: var(--teacher-main-color);
			border: none;
		}
	}


`

export default CheckBox
