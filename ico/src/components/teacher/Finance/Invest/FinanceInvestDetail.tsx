import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteInvestAPI } from "@/api/teacher/finance/deleteInvestAPI"

import useNotification from "@/hooks/useNotification"

import { investItemType } from "@/types/teacher/apiReturnTypes"

import Button from "@/components/common/Button/Button"
import Input from "@/components/common/Input/Input"
import useModal from "@/components/common/Modal/useModal"
import ModalAlert from "@/components/common/Modal/ModalAlert"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"

import { putInvestItemAPI } from "@/api/teacher/finance/putInvestItemAPI"

type FinanceInvestDetailprops = {
	data: investItemType
	id: number
}

const FinanceInvestDetail = ({ data, id }: FinanceInvestDetailprops) => {
	const [title, setTitle] = useState(data.stock)
	const [content, setContent] = useState(data.content)

	const [initTitle, initSetTitle] = useState(data.stock)
	const [initContent, initSetContent] = useState(data.content)

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}

	const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value)
	}

	const mutation = useMutation(putInvestItemAPI)
	const queryClient = useQueryClient()
	const noti = useNotification()
	const modal = useModal()

	const updateInvestItem = async () => {
		try {
			const updatedBody = {
				title: title,
				content: content,
			}

			await mutation.mutateAsync({ idx: id, body: updatedBody })

			initSetTitle(title)
			initSetContent(content)

			noti({
				content: <NotiTemplate type={"ok"} content={"투자 상품을 수정했습니다."} />,
				duration: 5000,
			})
		} catch (error) {
			noti({
				content: <NotiTemplate type={"ok"} content={"수정 실패."} />,
				duration: 5000,
			})
		}
	}

	const deleteMutation = useMutation(deleteInvestAPI, {
		onSuccess: () => {
			queryClient.invalidateQueries(["teacher", "financeInvest"])
		},
	})

	const handleDeleteItem = (itemId: number) => {
		deleteMutation.mutate({ idx: itemId })
	}

	console.log(id)

	return (
		<div>
			{modal(
				<ModalAlert
					title={"투자 종목을 삭제합니다."}
					titleSize={"var(--teacher-h2)"}
					proceed={() => handleDeleteItem(id)}
					width={"480px"}
					content={[
						"작성한 모든 이슈가 삭제됩니다.",
						"학생들이 보유한 투자 상품은 최근 이슈의 가격으로 전량 매도됩니다.",
					]}
				/>,
			)}
			<div css={titleCSS}>
				<div>
					투자 종목명은
					<Input value={title} onChange={handleTitleChange} theme={"default"} textAlign={"right"} />
					입니다.
				</div>

				<div>
					<Button
						text={"정보 수정하기"}
						fontSize={"var(--teacher-h5)"}
						width={"150px"}
						theme={"normal"}
						onClick={updateInvestItem}
						disabled={title === initTitle && content === initContent && true}
					/>
					<Button
						text={"종목 삭제하기"}
						fontSize={"var(--teacher-h5)"}
						width={"150px"}
						theme={"warning"}
						onClick={modal.open}
					/>
				</div>
			</div>

			<div>
				<Input value={content} onChange={handleContentChange} theme={"default"} textAlign={"left"} />
			</div>
		</div>
	)
}

const titleCSS = css`
	display: flex;
	font-size: 1.3rem;
	align-items: center;
	justify-content: space-between;

	&>div: first-of-type {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
	}

	& > div:nth-of-type(2) {
		display: flex;
		align-items: center;
		gap: 5px;
		tab-index: -1;
	}
`
export default FinanceInvestDetail
