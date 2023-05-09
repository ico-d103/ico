import React, {useState, useRef} from "react"
import { css } from "@emotion/react"
import CommonListElement from "../../common/CommonListElement/CommonListElement"
import FormCreator from "../../common/Form/FormCreator"
import GovJobCreate from "./GovJobCreate"
import useCompHandler from "@/hooks/useCompHandler"
import GovJobCard from "./GovJobCard"
import GovJobCardCreate from "./GovJobCardCreate"
import Dropdown from "@/components/common/Dropdown/Dropdown"

type GovRuleClassDetailProps = {
	job: string
	description: string
	wage: number
	credit: number
	backgroundColor: string
	imgUrl: string
	total: number
	count: number
	actualIdx: number
}

function GovJobDetail({ job, description, wage, backgroundColor, imgUrl, credit, total, count, actualIdx }: GovRuleClassDetailProps) {
	const [openComp, closeComp, compState] = useCompHandler()
	const [openDropdown, closeDropdown, dropdownState] = useCompHandler()
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

	const buttonRender = dropdownList && (
		<div
			css={buttonCSS}
			onClick={() => {
				openDropdown()
			}}
		>
			<Dropdown
				compState={dropdownState}
				closeComp={closeDropdown}
				width={"128px"}
				height={"48px"}
				element={dropdownList}
				align={"right"}
			/>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
					stroke="black"
					strokeOpacity="0.5"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
					stroke="black"
					strokeOpacity="0.5"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
					stroke="black"
					strokeOpacity="0.5"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	)


	return (
		<div ref={wrapperRef} css={outerWrapperCSS} >
			<FormCreator subComp={<GovJobCreate count={count}/>} frontComp={<GovJobCardCreate />} showIdx={0} compState={compState} closeComp={closeEditHandler} mainInit={{title: job, content: description}} subInit={{wage, backgroundColor, imgUrl, credit, total }} initHeight={`${wrapperRef.current && wrapperRef.current.clientHeight}px`} />
			<div css={WrapperCSS({isEdit, backgroundColor})}>
				<div css={detailWrapperCSS}>
					<GovJobCard job={job} wage={wage} backgroundColor={backgroundColor} imgUrl={imgUrl} />
					<div css={contentWrapperCSS}>
						<div css={headerCSS}>
							<div css={jobTitleCSS}>
								{job} ({count} / {total})
							</div>
							{buttonRender}
						</div>

						<div css={bodyCSS}>
							<div css={descriptionCSS}>
								{description}
							</div>
							<div css={secondaryInfoCSS}>
								{credit}등급 이상 / 일급 {wage}미소
							</div>
						</div>
					</div>
					
					
				</div>
				
			</div>
			
		</div>
		
	)

	

}

const outerWrapperCSS = css`
	margin: 36px 0px 36px 0px;
	min-width: 800px;
`

const WrapperCSS = ({isEdit, backgroundColor}: {isEdit: boolean, backgroundColor: string}) => {
	return css`
		transition-duration: ${isEdit ? '0s' : '0.3s'};
		transition-property: opacity;
		opacity: ${isEdit ? '0%' : '100%'};
		position: ${isEdit ? 'absolute;' : 'static'};
		/* background-color: ${backgroundColor}; */
		background: linear-gradient( 45deg, ${backgroundColor}, white, white );
		border-radius: 12px;
	`
}

const detailWrapperCSS = css`
	width: 100%;
	display: flex;
	/* flex-direction: column; */
	/* justify-content: space-between; */
	margin-top: 12px;
	/* align-items: center; */
	box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.1);
	padding: 16px;
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.8);
`

const contentWrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;

`


const buttonCSS = css`
	background-color: rgba(0, 0, 0, 0.1);
	width: 48px;
	height: 48px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition-property: background-color;
	transition-duration: 0.3s;
	cursor: pointer;
	user-select: none;
	position: relative;

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
`

const headerCSS = css`
	width: 100%;
	max-height: 48px;
	display: flex;
	margin-top: 14px;
	padding-right: 12px;
`

const jobTitleCSS = css`
	flex:1;
	font-size: var(--teacher-h1);
	border-bottom: 2px solid rgba(0, 0, 0, 0.1);
	margin-right: 16px;
	display: flex;
	align-items: center;
	font-weight: 500;
`

const descriptionCSS = css`
	font-weight: 500;
`

const bodyCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 14px 0px 20px 0px;
`

const secondaryInfoCSS = css`
	font-weight: 500;
	color: rgba(0, 0, 0, 0.5);
`

export default GovJobDetail
