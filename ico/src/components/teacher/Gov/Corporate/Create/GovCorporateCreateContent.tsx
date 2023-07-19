import { useState } from "react"
import { css } from "@emotion/react"
import Input from "@/components/common/Input/Input"
import { NUM_ONLY } from "@/util/regex"

type GovCorporateCreateContentsProps = {
	label: string
	essential: boolean
	placeholder: string
	type: string
}

function GovCorporateCreateContent({ label, essential, placeholder, type }: GovCorporateCreateContentsProps) {
	const [isValid, setIsValid] = useState<boolean>(false)

	const validCheckHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.target.value

		switch (type) {
			case "corporate_name":
				if (value.length && value.length <= 10) setIsValid(true)
				else setIsValid(false)
				break
			case "corporate_desc":
				if (value.length && value.length <= 200) setIsValid(true)
				else setIsValid(false)
				break
			case "corporate_logo":
				break
			case "corporate_ceo":
				break
			case "corporate_capital":
				if (value.length && NUM_ONLY.test(value)) setIsValid(true)
				else setIsValid(false)
				break
		}
	}

	return (
		<div css={wrapperCSS}>
			<span>
				{label} <b>{essential ? "*" : ""}</b>
			</span>
			<div>
				<Input theme={"greenDefault"} placeholder={placeholder} onChange={(e) => validCheckHandler(e)} />
				{isValid ? <span>✓</span> : <></>}
			</div>
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: column;
	gap: 15px;

	> span {
		font-size: var(--teacher-h5);

		> b {
			font-weight: bold;
			color: var(--teacher-warning-color);
		}
	}

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 15px;

		> div {
			width: 100%;
		}
	}
`

export default GovCorporateCreateContent
