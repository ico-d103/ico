import React, { useState } from "react"
import { css } from "@emotion/react"

type ToggleButtonProps = {
	leftLabel: string
	rightLabel: string
}

const ShopCreateToggleButton = ({ leftLabel, rightLabel }: ToggleButtonProps) => {
	const [toggle, setToggle] = useState(false)

	const toggleState = () => {
		setToggle(!toggle)
	}

	return (
		<form css={switchFieldCSS}>
			<input
				type="radio"
				id="switch_left"
				name="switchToggle"
				value={leftLabel}
				onChange={toggleState}
				checked={!toggle}
			/>
			<label htmlFor="switch_left">{leftLabel}</label>

			<input
				type="radio"
				id="switch_right"
				name="switchToggle"
				value={rightLabel}
				onChange={toggleState}
				checked={toggle}
			/>
			<label htmlFor="switch_right">{rightLabel}</label>
		</form>
	)
}

const switchFieldCSS = css`
	display: flex;
	input {
		position: absolute !important;
		clip: rect(0, 0, 0, 0);
		height: 1px;
		width: 1px;
		border: 0;
		overflow: hidden;
	}

	label {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
		width: 50%;
		background-color: var(--common-back-color);
		transition: all 0.25s ease-in-out;

		font-size: 1.1rem;

		border: none;

		&:hover {
			cursor: pointer;
		}

		&:first-of-type {
			border-radius: 10px 0 0 10px;
		}

		&:last-of-type {
			border-radius: 0 10px 10px 0;
		}
	}

	input:checked + label {
		background-color: var(--teacher-main-color);
		color: #fff;
	}
`

export default ShopCreateToggleButton
