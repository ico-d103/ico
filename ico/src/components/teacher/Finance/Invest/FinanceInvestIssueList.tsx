import { investIssueType } from "@/types/teacher/apiReturnTypes"
import { css } from "@emotion/react"

import Button from "@/components/common/Button/Button"

import useCompHandler from "@/hooks/useCompHandler"
import FormCreator from "../../common/Form/FormCreator"
import FinanceInvestIssueCreate from "./FinanceInvestIssueCreate"

import FinanceInvestIssueDetail from "./FinanceInvestIssueDetail"

type FinanceInvestIssueProps = {
	data: investIssueType
}

const FinanceInvestIssueList = ({ data }: FinanceInvestIssueProps) => {
	const [openComp, closeComp, compState] = useCompHandler()

	// console.log(data)

	// const renderRule =
	// 	data &&
	// 	data.map((el, idx) => {
	// 		return <FinanceInvestIssueDetail showIdx={idx} date={el.date} amount={el.amount} content={el.content} />
	// 	})

	const price = data.amount

	return (
		<div css={innerBorderCSS}>
			{/* <div>{data.amount}</div>
			<div>{data.date}</div>
			<div>{data.content}</div>
			<div>{data.rate}</div> */}

			{/* <div>
				{!compState && (
					<div>
						<Button
							text={"이슈 추가 등록"}
							fontSize={"var(--teacher-h5)"}
							width={"120px"}
							height={"45px"}
							theme={"normal"}
							onClick={() => {
								openComp()
							}}
						/>
					</div>
				)}
			</div> */}

			{/* <FormCreator
				subComp={<FinanceInvestIssueCreate price={price} />}
				showIdx={1}
				subInit={{ taxation: 0, value: 0 }}
				// titlePlaceHolder={"투자 주제를 입력해주세요."}
				contentPlaceHolder={"내일의 이슈를 입력해주세요."}
				isNoTitle={true}
				compState={compState}
				closeComp={closeComp}
			/> */}

			{/* {renderRule} */}
		</div>
	)
}

const innerBorderCSS = css`
	// border: 1px solid black;
`

export default FinanceInvestIssueList
