import React, {useState} from "react"
import { css } from "@emotion/react"
import CollapseMenu from "../../common/CollapseMenu/CollapseMenu"
import TableGenerator from "../../../common/TableGenerator/TableGenerator"
import Button from "@/components/common/Button/Button"
import useGetNation from "@/hooks/useGetNation"
import Input from "@/components/common/Input/Input"
import { putGovCreditAPI } from "@/api/teacher/gov/putGovCreditAPI"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

function GovRuleCredit() {
	const [creditUp, setCreditUp] = useState<number>(0)
	const [creditDown, setCreditDown] = useState<number>(0)

	const creditRating = [
		["등급", "1등급", "2등급", "3등급", "4등급", "5등급", "6등급", "7등급", "8등급", "9등급", "10등급"],
		["최저", "901", "801", "701", "601", "501", "401", "301", "201", "101", "0"],
		["최고", "100", "900", "800", "700", "600", "500", "400", "300", "200", "100"],
	]

	const [nation, getNation] = useGetNation()
	const noti = useNotification()
	const creditUpInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		
		setCreditUp(() => Number(e.target.value))
	}

	const creditDownInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		
		setCreditDown(() => Number(e.target.value))
	}


	// const createMutation = useMutation(async (body: {creditUp: number, creditDown: number}) => {
	// 	queryClient.setQueryData(["common", "nation"], putGovCreditAPI({body}));
	//   });

	  
	const submit = () => {
		putGovCreditAPI({body: {creditUp: creditUp === 0 ? nation.credit_up : creditUp, creditDown: creditDown === 0 ? nation.credit_down : creditDown}})
		.then((res) => {
			getNation()
			noti({content:<NotiTemplate type={'ok'} content={"신용 점수 등락폭을 수정하였습니다."} />, duration: 4000})
		})
		

	}

	return (
		<CollapseMenu title={<span>신용 등급</span>} fontSize={"var(--teacher-h1)"} bracketSize={"18px"}>
			<React.Fragment>
				신용등급의 등락폭을 수정할 수 있습니다.
				<div css={tableWrapperCSS}>
					<TableGenerator table={creditRating} perHeight={"48px"} />
				</div>
				<div css={footerCSS}>
					<div css={inputOuterWrapperCSS}>
						{nation.credit_up && (
							<div css={inputWrapperCSS}>
								상승폭
								<Input
									defaultValue={nation.credit_up}
									theme={"greenDefault"}
									customCss={css`
										width: 64px;
										height: 36px;
									`}
									onChange={creditUpInputHandler}
									type={'number'}
								/>
							</div>
						)}
						{nation.credit_down && (
							<div css={inputWrapperCSS}>
								하락폭
								<Input
									defaultValue={nation.credit_down}
									theme={"greenDefault"}
									customCss={css`
										width: 64px;
										height: 36px;
									`}
									onChange={creditDownInputHandler}
									type={'number'}
								/>
							</div>
						)}
					</div>

					<Button
						disabled={(creditUp !== 0 && creditUp !== nation.credit_up) || ( creditDown !== 0 && creditDown !== nation.credit_down) ? false : true}
						text={"등락폭 수정"}
						fontSize={"var(--teacher-h5)"}
						theme={"normal"}
						width={"110px"}
						onClick={() => {submit()}}
						margin={"0px 0px 0px 24px"}
					/>
			
				</div>
			</React.Fragment>
		</CollapseMenu>
	)
}

const tableWrapperCSS = css`
	margin-top: 36px;
`

const footerCSS = css`
	margin-top: 16px;
	display: flex;
	justify-content: end;
	align-items: center;
	height: 48px;
`

const inputOuterWrapperCSS = css`
	display: flex;
`
const inputWrapperCSS = css`
	display: flex;
	margin-right: 16px;
	align-items: center;
	gap: 8px;
`

export default GovRuleCredit
