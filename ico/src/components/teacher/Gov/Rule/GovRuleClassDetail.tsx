import React, {useState, useRef} from "react"
import { css } from "@emotion/react"
import CommonListElement from "../../common/CommonListElement/CommonListElement"
import FormCreator from "../../common/Form/FormCreator"
import GovRuleClassCreate from "./GovRuleClassCreate"
import useCompHandler from "@/hooks/useCompHandler"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
import { deleteGovRuleAPI } from "@/api/teacher/gov/deleteGovRuleAPI"
import Modal from "@/components/common/Modal/Modal"
import ModalAlert from "@/components/common/Modal/ModalAlert"

type GovRuleClassDetailProps = {
	title: string
	content: string
	date: string
	showIdx: number
	actualIdx?: number
}

function GovRuleClassDetail({ title, content, date, showIdx, actualIdx }: GovRuleClassDetailProps) {
	const [openComp, closeComp, compState] = useCompHandler()
	const [openDeleteModal, closeDeleteModal, deleteModalState] = useCompHandler()
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const dropdownList = [
		{ name: "edit", content: null, label: "수정", function: () => {openEditHandler()} },
		{ name: "delete", content: null, label: "삭제", function: () => {openDeleteModal()} },
	]

	const openEditHandler = () => {
		setIsEdit(() => true)
		openComp()
	}

	const closeEditHandler = () => {
		closeComp()
		setIsEdit(() => false)
	}


	const queryClient = useQueryClient();
	const createMutation = useMutation((idx: number) => deleteGovRuleAPI({idx}));

	const deleteHandler = () => {
		if (actualIdx) {
			createMutation.mutate(actualIdx, {
				onSuccess: formData => {
				  return queryClient.invalidateQueries(["teacher", "govRule"]); // 'return' wait for invalidate
				}})
		}
		
	}

	return (
		<div ref={wrapperRef} >
			<Modal compState={deleteModalState} closeComp={closeDeleteModal} transition={'scale'} content={<ModalAlert title={'학급 규칙을 삭제합니다.'} titleSize={'var(--teacher-h2)'} proceed={deleteHandler} width={'480px'} content={['학생들이 더이상 해당 학급 규칙을 조회할 수 없습니다!']} />}/>
			<FormCreator subComp={<GovRuleClassCreate idx={actualIdx} />} showIdx={showIdx} actualIdx={actualIdx} compState={compState} closeComp={closeEditHandler} mainInit={{title, content}} initHeight={`${wrapperRef.current && wrapperRef.current.clientHeight}px`} />
			<div css={WrapperCSS({isEdit})}>
				<CommonListElement idx={showIdx} dropdownList={dropdownList}>
					<div css={detailWrapperCSS}>
						<div>
							<div css={titleCSS}>{title}</div>
							<div css={contentCSS}>{content}</div>
						</div>
						<div css={dateCSS}>{date}</div>
					</div>
				</CommonListElement>
			</div>
			
		</div>
		
	)

	

}


const WrapperCSS = ({isEdit}: {isEdit: boolean}) => {
	return css`
		transition-duration: ${isEdit ? '0s' : '0.3s'};
		transition-property: opacity;
		opacity: ${isEdit ? '0%' : '100%'};
		position: ${isEdit ? 'absolute;' : 'static'};
	`
}

const detailWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 12px;
	/* align-items: center; */
`

const titleCSS = css`
	font-weight: 700;
	margin-bottom: 10px;
`

const dateCSS = css`
	height: 100%;
	min-width: 100px;
	font-size: var(--teacher-h6);
	font-weight: 600;
	color: rgba(0, 0, 0, 0.6);

	margin: 4px 16px 0px 16px;
`

const contentCSS = css`
	line-height: 130%;
	word-break: normal;
	white-space: pre;
`

export default GovRuleClassDetail
