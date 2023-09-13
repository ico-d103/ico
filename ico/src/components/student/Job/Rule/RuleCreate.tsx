import Input from "@/components/common/Input/Input"
import React, {useState} from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import useNavigate from "@/hooks/useNavigate"
import { putGovRuleAPI } from "@/api/teacher/gov/putGovRuleAPI"
import { postGovRuleAPI } from "@/api/teacher/gov/postGovRuleAPI"
import { useQueryClient } from "@tanstack/react-query"


type RuleCreateProps = {
	id?: number
	title?: string
	content?: string
}

function RuleCreate({ id, title, content }: RuleCreateProps) {
	const navigate = useNavigate()

	const [titleState, setTitleState] = useState(title || '')
	const [contentState, setContentState] = useState(content || '')
	const queryClient = useQueryClient()

	const submitHandler = () => {
		if (id) {
			putGovRuleAPI({idx: id, body: {title: titleState, detail: contentState}})
			.then((res) => {
				navigate("/student/job/rule", "bottomToTop")
			})
			// 글 수정 api
		} else {
			postGovRuleAPI({body: {title: titleState, detail: contentState}})
			.then((res) => {
				queryClient.invalidateQueries(["student", "job", "rule"])
				queryClient.invalidateQueries(["student", "gov", "rule"])
				navigate("/student/job/rule", "bottomToTop")
			})
			
			// 글 작성 api
		}
	}

	return (
		<div css={ruleCreateWrapperCSS}>
			<div css={ruleTitleWrapperCSS}>{id ? "글 수정" : "글 작성"}</div>
			<Input theme={"mobileWhite"} placeholder="제목을 입력해 주세요!" value={titleState} onChange={(e) => setTitleState(() => e.target.value)} />
			<div css={lineCSS} />
			<div
				css={css`
					flex: 1;
					display: grid;
				`}
			>
				<Input
					theme={"mobileWhite"}
					placeholder="내용을 입력해 주세요!"
					value={contentState}
					onChange={(e) => setContentState(() => e.target.value)}
					isTextarea={true}
					customCss={textAreaCSS}
					resizeTextarea={false}
				/>
			</div>

			<div css={buttonWrapperCSS}>
				<Button
					text={"취소"}
					fontSize={`var(--student-h3)`}
					width={"100px"}
					height={"36px"}
					// height={"70vw"}
					theme={"mobileSoft"}
					onClick={() => {
						navigate("/student/job/rule", "bottomToTop")
					}}
				></Button>
				<Button
					text={id ? "수정" : "작성"}
					fontSize={`var(--student-h3)`}
					width={"100px"}
					height={"36px"}
					// height={"70vw"}
					theme={"mobileSoft"}
					onClick={submitHandler}
				></Button>
			</div>
		</div>
	)
}

const ruleTitleWrapperCSS = css`
	width: 95%;
	font-size: var(--student-h1);
	margin: 0px 0px 24px 0px;

	display: flex;
	justify-content: space-between;
`

const ruleCreateWrapperCSS = css`
	padding: 24px;
	display: flex;
	flex-direction: column;
	/* height: 100%; */
	flex: 1;
	width: 100%;
`

const lineCSS = css`
	width: 100%;
	height: 1px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	position: relative;
	margin: 16px 0px 16px 0px;
`

const textAreaCSS = css`
	/* display: flex; */

	width: 100%;
	height: 100%;
	/* flex: 1; */

	& label textarea {
		/* flex: 1; */
		flex: 1;
	}
`

const buttonWrapperCSS = css`
	/* width: 100%; */
	display: flex;
	justify-content: flex-end;
	margin: 16px 0px 16px 0px;
	gap: 8px;
`

export default RuleCreate
