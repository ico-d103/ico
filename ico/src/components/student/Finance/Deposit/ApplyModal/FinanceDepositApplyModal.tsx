import React, {useState} from "react"
import Input from "@/components/common/Input/Input"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { getFinanceDepositRateType } from "@/types/student/apiReturnTypes"
import { postFinanceDepositAPI } from "@/api/student/finance/postFinanceDepositAPI"

const ALERT_ICON = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 8V12M12 16H12.01M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
			stroke="#D94A4A"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const CHECK_ICON = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9 11L12 14L22 4M16 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V12"
			stroke="#0066FF"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

type FinanceDepositApplyModalProps = {
	term: 0 | 1
	data: getFinanceDepositRateType
	unit: string
	closeComp: Function
	refetch: Function
}


function FinanceDepositApplyModal({term, data, unit, closeComp, refetch}: FinanceDepositApplyModalProps) {
	const [ value, setValue] = useState<number>(0)

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) <= data.account) {
			setValue(() => Number(e.target.value))
		}
	}

	const submitHandler = () => {
		postFinanceDepositAPI({body: {longPeriod: term === 1 ? true : false, amount: value}}).then((res) => {
			refetch()
			closeComp()
		})
		.catch((err) => {
			
		})
	}
	return (
		<div css={wrapperCSS}>
			<div css={grayLabelCSS}>원하는 액수를 입력해 주세요!</div>
			<Input value={value} onChange={onChangeHandler} theme={"default"} textAlign={"right"} rightContent={<div css={balanceLabelCSS}>/ {data.account} {unit}</div>} customCss={inputCSS} />
			<div css={mentWrapperCSS}>
				<div css={iconWrapperCSS}>
					{ALERT_ICON}
				</div>
				
				<span css={mentCSS}>중도에 해지하면, 원금만 돌려받을 수 있어요!</span>
			</div>
			<div css={mentWrapperCSS}>
				<div css={iconWrapperCSS}>
				{CHECK_ICON}
				</div>
				
				<span css={mentCSS}>만기가 되면 원금의 {term === 0 ? data.shortPeriod : data.longPeriod}퍼센트 만큼 추가로 더 돌려받을 수 있어요!</span>
			</div>

			<div css={buttonWrapperCSS}>
			<Button text={"정기 예금 신청"} fontSize={"var(--student-h3)"} width={"47%"} theme={"positive"} onClick={()=>{submitHandler()}} />
			<Button text={"취소"} fontSize={"var(--student-h3)"} width={"47%"} theme={"cancelDark"} onClick={()=>{closeComp()}} />
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
`

const grayLabelCSS = css`
	color: rgba(0, 0, 0, 0.6);
	font-size: var(--student-h3);
	margin-bottom: 8px;
`

const inputCSS = css`
	width: 100%;
	margin-bottom: 12px;
`

const mentWrapperCSS = css`
	
	display: flex;
`

const iconWrapperCSS = css`
	/* height: 100%; */
	/* background-color: red; */
	/* margin-top: 4px; */
`

const mentCSS = css`
	font-size: 14px;
	margin-left: 8px;
	height: 24px;
	margin-top: 4px;
	line-height: 130%;
	
`

const buttonWrapperCSS = css`
margin-top: 24px;
	display: flex;
	justify-content: space-between;
`

const balanceLabelCSS = css`
	color: rgba(0, 20, 50, 0.6);
	margin-right: 8px;
	white-space: nowrap;
`

export default FinanceDepositApplyModal
