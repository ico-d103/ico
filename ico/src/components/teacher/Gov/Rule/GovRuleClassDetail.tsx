import React, {useState, useRef} from "react"
import { css } from "@emotion/react"
import CommonListElement from "../../common/CommonListElement/CommonListElement"
import FormCreator from "../../common/Form/FormCreator"
import GovRuleClassCreate from "./GovRuleClassCreate"
import useCompHandler from "@/hooks/useCompHandler"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';

type GovRuleClassDetailProps = {
	title: string
	content: string
	date: string
	showIdx: number
	actualIdx?: number
}

function GovRuleClassDetail({ title, content, date, showIdx, actualIdx }: GovRuleClassDetailProps) {
	const [openComp, closeComp, compState] = useCompHandler()
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const dropdownList = [
		{ name: "edit", content: null, label: "수정", function: () => {openEditHandler()} },
		{ name: "delete", content: null, label: "삭제", function: () => {} },
	]

	const openEditHandler = () => {
		setIsEdit(() => true)
		openComp()
	}

	const closeEditHandler = () => {
		closeComp()
		setIsEdit(() => false)
	}

	// 학급 규칙 삭제 구현시 수정해서 쓸 것 
	// const queryClient = useQueryClient();
	// const createMutation = useMutation((a: number) => postGovRuleAPI({body: {title: inputState.title, detail: inputState.content}}));

	return (
		<div ref={wrapperRef} >
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
`

export default GovRuleClassDetail
