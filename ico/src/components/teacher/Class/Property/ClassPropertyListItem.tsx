import Modal from "@/components/common/Modal/Modal"
import ModalContent from "@/components/common/Modal/ModalContent"
import useCompHandler from "@/hooks/useCompHandler"
import useGetNation from "@/hooks/useGetNation"
import { css } from "@emotion/react"
import { CLASS_BIG_PROPERTY } from "../ClassIcons"
import ModalAlert from "@/components/common/Modal/ModalAlert"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTreasuryHistoryAPI } from "@/api/teacher/class/deleteTreasuryHistoryAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { selectedPage } from "@/store/store"
import { useAtomValue } from "jotai"
import useModal from "@/components/common/Modal/useModal"

type PropertyListItemPropsType = {
	property: {
		id: string
		date: string
		title: string
		source: string
		amount: string
	}
	showDate: boolean
}

function PropertyListItem({ property, showDate }: PropertyListItemPropsType) {
	const noti = useNotification()
	const [nation] = useGetNation()
	const queryClient = useQueryClient()
	// const [openComp, closeComp, compState] = useCompHandler()
	const modal = useModal()
	const selectedPageAtom = useAtomValue(selectedPage)
	const deleteTreasuryHistoryMutation = useMutation((id: string) => deleteTreasuryHistoryAPI({ id }))

	const deletePropertyList = () => {
		deleteTreasuryHistoryMutation.mutate(property.id, {
			onSuccess: () => {
				noti({
					content: <NotiTemplate type={"ok"} content={`내역이 성공적으로 삭제되었습니다.`} />,
					duration: 3000,
				})

				queryClient.invalidateQueries(["propertyList", selectedPageAtom])
			},
			onError: () => {
				noti({
					content: <NotiTemplate type={"alert"} content={`오류가 발생했습니다. 다시 시도해주세요.`} />,
					duration: 3000,
				})
			},
		})
	}

	return (
		<>
			<tr css={wrapperCSS} onClick={() => modal.open()}>
				<td css={dateCSS}>{showDate ? <h4>{property.date}</h4> : <h4 css={hiddenDateCSS}>{property.date}</h4>}</td>
				<td css={moneyCSS}>
					{property.amount.includes("-") ? (
						<h3 css={minusMoneyCSS}>
							{property.amount} {nation.currency}
						</h3>
					) : (
						<h3 css={plusMoneyCSS}>
							{property.amount} {nation.currency}
						</h3>
					)}
				</td>
				<td css={titleCSS}>
					<h3>{property.title}</h3>
				</td>
				<td css={sourceCSS}>
					<h3>{property.source}</h3>
				</td>
			</tr>
			{/* <Modal
				compState={compState}
				closeComp={closeComp}
				transition={"scale"}
				content={
					<ModalAlert
						title={"내역을 삭제하시겠습니까?"}
						titleSize={"var(--teacher-h2)"}
						proceed={deletePropertyList}
						width={"480px"}
						content={[
							"내역 삭제 후 복원할 수 없습니다",
							`${property.source}의 ${property.title}을 삭제하시는 게 맞는지 다시 확인해주세요`,
						]}
					/>
				}
			/> */}
			{modal(
				<ModalAlert
					title={"내역을 삭제하시겠습니까?"}
					titleSize={"var(--teacher-h2)"}
					proceed={deletePropertyList}
					width={"480px"}
					content={[
						"내역 삭제 후 복원할 수 없습니다",
						`${property.source}의 ${property.title}을 삭제하시는 게 맞는지 다시 확인해주세요`,
					]}
				/>,
			)}
		</>
	)
}

const wrapperCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 15px;
	border-radius: 10px;
	transition: all 0.1s;
	cursor: pointer;

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	h3 {
		font-size: var(--teacher-h3);
	}

	h4 {
		font-size: var(--teacher-h4);
	}
`

const dateCSS = css`
	width: 100px;

	> h4 {
		color: var(--teacher-gray-color);
	}
`

const moneyCSS = css`
	width: 150px;
	text-align: right;
	margin-right: 50px;

	> h3 {
		font-weight: bold;
	}
`

const titleCSS = css`
	flex: 5;
	min-width: 150px;
`

const sourceCSS = css`
	width: 150px;
	text-align: right;
`

const hiddenDateCSS = css`
	visibility: hidden;
`

const plusMoneyCSS = css`
	color: var(--teacher-blue-color);
`

const minusMoneyCSS = css`
	color: var(--teacher-warning-color);
`

export default PropertyListItem
