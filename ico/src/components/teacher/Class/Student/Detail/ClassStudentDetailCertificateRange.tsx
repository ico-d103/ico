import React, { useState } from "react"
import { css } from "@emotion/react"
import { useAtom } from "jotai"
import { modifiedStudentLicenseInfo } from "@/store/store"

type ClassStudentDetailCertificateRangePropsType = {
	id: number
	range: number
}

function ClassStudentDetailCertificateRange({ id, range }: ClassStudentDetailCertificateRangePropsType) {
	const [modifiedStudentLicenseInfoAtom, setModifiedStudentLicenseInfoAtom] = useAtom(modifiedStudentLicenseInfo)

	const MAX_RANGE = 100 / 8
	const [inputRange, setInputRange] = useState<number>(range === -1 ? range : 8 - range)

	const changeInputRange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value)
		setInputRange(value)

		e.target.style.background =
			"linear-gradient(to right, #FFE283 0%, #FFE283 " +
			MAX_RANGE * value +
			"%, rgb(236, 236, 236) " +
			MAX_RANGE * value +
			"%, rgb(236, 236, 236) 100%)"

		let rating = 8 - value
		if (value === 0) rating = -1
		setModifiedStudentLicenseInfoAtom({ ...modifiedStudentLicenseInfoAtom, [id]: rating })
	}

	return (
		<div css={wrapperCSS}>
			<input
				type="range"
				value={inputRange}
				min="0"
				max="8"
				step="1"
				onChange={(e) => changeInputRange(e)}
				css={inputRangeCSS(MAX_RANGE, inputRange)}
			/>
			<span>{inputRange === -1 || inputRange === 0 ? `` : inputRange === 8 ? `달인 👍` : `${8 - inputRange}등급`}</span>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 30px;

	> span {
		min-width: 80px;
	}
`

const inputRangeCSS = (maxRange: number, inputRange: number) => {
	return css`
		width: 100%;
		background: linear-gradient(
			to right,
			#ffe283 0%,
			#ffe283 ${maxRange * inputRange}%,
			#ececec ${maxRange * inputRange}%,
			#ececec 100%
		);
		border-radius: 8px;
		outline: none;
		transition: background 450ms ease-in;
		-webkit-appearance: none;
		appearance: none;
		accent-color: #ffe283;
	`
}

export default ClassStudentDetailCertificateRange
