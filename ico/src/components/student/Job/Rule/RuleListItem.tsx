import { getGovRuleType } from "@/types/teacher/apiReturnTypes"
import React from "react"
import { css } from "@emotion/react"
import ContentWrapper from "../../common/ContentWrapper/ContentWrapper"
import Button from "@/components/common/Button/Button"
import useNavigate from "@/hooks/useNavigate"
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu"
import ListNumbering from "../../Gov/ListNumbering"
import { useQueryClient } from "@tanstack/react-query"
import { deleteGovRuleAPI } from "@/api/teacher/gov/deleteGovRuleAPI"
import useModal from "@/components/common/Modal/useModal"
import ModalAlert from "@/components/common/Modal/ModalAlert"

type RuleItemProps = {
	rule: getGovRuleType
	idx: number
}

function RuleListItem({ rule, idx }: RuleItemProps) {
	const navigate = useNavigate()
	const deleteModal = useModal()
	const queryClient = useQueryClient()

	const deleteRuleHandler = () => {
		deleteGovRuleAPI({ idx: rule.id }).then((res) => {
			queryClient.invalidateQueries(["studentJobNews"])
			queryClient.invalidateQueries(["student", "gov", "rule"])
		})
	}

	const editSection = (
		<div
			css={css`
				display: flex;
				width: 100%;
				justify-content: flex-end;
				gap: 8px;
				margin-top: 8px;
			`}
		>
			<Button
				text={"수정"}
				fontSize={`var(--student-h3)`}
				width={"64px"}
				height={"28px"}
				// height={"70vw"}
				theme={"mobileSoft3"}
				onClick={(e) => {
					e.stopPropagation()
					navigate(`/student/job/rule/${rule.id}`, "bottomToTop")
				}}
			></Button>
			<Button
				text={"삭제"}
				fontSize={`var(--student-h3)`}
				width={"64px"}
				height={"28px"}
				// height={"70vw"}
				theme={"mobileCancel"}
				onClick={deleteModal.open}
			></Button>
		</div>
	)

	return (
		<React.Fragment>
			{deleteModal(
				<ModalAlert
					content={["해당 학급 소식이 삭제되요!"]}
					proceed={deleteRuleHandler}
					width={"300px"}
					title={"학급 소식 삭제"}
					titleSize={"24px"}
				/>,
			)}

			<CollapseMenu
				key={rule.id}
				title={<ListNumbering number={idx + 1} text={rule.title} />}
				fontSize={`var(--student-h3)`}
				bracketSize={"10px"}
				marginBottom={"10px"}
				reverse={true}
				customCss={css`
					width: 95%;
				`}
			>
				<div
					css={css`
						width: 100%;
					`}
				>
					<div css={detailWrapperCSS}>{rule.detail}</div>

					{rule.author !== "선생님" && editSection}

					<div css={ruleDataWrapperCSS}>
						<span>최초 작성자 : {rule.author}</span>

						<span>
							{rule.createdAt === rule.updatedAt ? `작성일 : ${rule.createdAt}` : `수정일 : ${rule.updatedAt}`}
						</span>
					</div>
				</div>
			</CollapseMenu>
		</React.Fragment>
	)

	// return (
	//   <ContentWrapper css={wrapperCSS}>
	//     <div css={ruleTitleWrapperCSS}>
	//      {rule.title}
	//      <Button
	// 				text={"수정"}
	// 				fontSize={`var(--student-h3)`}
	// 				width={"84px"}
	// 				height={"28px"}
	// 				// height={"70vw"}
	// 				theme={"mobileSoft3"}
	// 				onClick={() => {
	// 					navigate(`/student/job/rule/${rule.id}`, "bottomToTop")
	// 				}}
	// 			></Button>
	//     </div>
	//     <div css={lineCSS}/>
	//     <div css={ruleDataWrapperCSS}>
	//       <span>최초 작성자 : {rule.author}</span>
	//       <span>{rule.createdAt === rule.updatedAt ? `작성일 : ${rule.createdAt}` : `수정일 : ${rule.updatedAt}`}</span>
	//     </div>
	//     {rule.detail}
	//   </ContentWrapper>
	// )
}

const wrapperCSS = css`
	white-space: pre-wrap;
	line-height: 150%;
`

const lineCSS = css`
	width: 100%;
	height: 1px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	position: relative;
	margin: 8px 0px 8px 0px;
`

const ruleTitleWrapperCSS = css`
	font-size: var(--student-h2);
	/* margin-bottom: 16px; */
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const ruleDataWrapperCSS = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	margin-top: 8px;
`

const detailWrapperCSS = css`
	white-space: pre-wrap;
	line-height: 150%;
	word-break: keep-all;
`

export default RuleListItem
