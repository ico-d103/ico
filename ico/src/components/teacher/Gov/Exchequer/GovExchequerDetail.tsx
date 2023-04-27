import React, {useState, useRef} from "react"
import { css } from "@emotion/react"
import CommonListElement from "../../common/CommonListElement/CommonListElement"
import FormCreator from "../../common/Form/FormCreator"
import GovExchequerCreate from "./GovExchequerCreate"
import useCompHandler from "@/hooks/useCompHandler"

type GovRuleClassDetailProps = {
	title: string
	content: string
	taxAspect: 0 | 1
	taxValue: number
	idx: number
}

function GovExchequerDetail({ title, content, taxAspect, taxValue, idx }: GovRuleClassDetailProps) {
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

	const taxPercent = (
		<div css={taxDescWrapperCSS}>
			<svg css={iconCSS} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 2.50008V12.0001M12 12.0001L20.5 7.27779M12 12.0001L3.5 7.27779M12 12.0001V21.5001M20.5 16.7223L12.777 12.4318C12.4934 12.2742 12.3516 12.1954 12.2015 12.1645C12.0685 12.1372 11.9315 12.1372 11.7986 12.1645C11.6484 12.1954 11.5066 12.2742 11.223 12.4318L3.5 16.7223M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z"
					stroke="#064F32"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			학생 월급에서 <span css={valueTextCSS}>&nbsp;{taxValue}%</span>에 해당하는 미소를 세금으로 부과합니다.
		</div>
	)

	const taxAbsolute = (
		<div css={taxDescWrapperCSS}>
			<svg css={iconCSS} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M20.5 16H8M8 16V3.5M8 16L3.5 20.5M3.5 8H16M16 8V20.5M16 8L20.5 3.5M21 15.3373V3.8C21 3.51997 21 3.37996 20.9455 3.273C20.8976 3.17892 20.8211 3.10243 20.727 3.0545C20.62 3 20.48 3 20.2 3H8.66274C8.41815 3 8.29586 3 8.18077 3.02763C8.07873 3.05213 7.98119 3.09253 7.89172 3.14736C7.7908 3.2092 7.70432 3.29568 7.53137 3.46863L3.46863 7.53137C3.29568 7.70432 3.2092 7.7908 3.14736 7.89172C3.09253 7.98119 3.05213 8.07873 3.02763 8.18077C3 8.29586 3 8.41815 3 8.66274V20.2C3 20.48 3 20.62 3.0545 20.727C3.10243 20.8211 3.17892 20.8976 3.273 20.9455C3.37996 21 3.51997 21 3.8 21H15.3373C15.5818 21 15.7041 21 15.8192 20.9724C15.9213 20.9479 16.0188 20.9075 16.1083 20.8526C16.2092 20.7908 16.2957 20.7043 16.4686 20.5314L20.5314 16.4686C20.7043 16.2957 20.7908 16.2092 20.8526 16.1083C20.9075 16.0188 20.9479 15.9213 20.9724 15.8192C21 15.7041 21 15.5818 21 15.3373Z"
					stroke="#064F32"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			학생 월급에서 <span css={valueTextCSS}>&nbsp;{taxValue}미소</span>를 세금으로 부과합니다.
		</div>
	)

	return (
		<div ref={wrapperRef} >
			<FormCreator subComp={<GovExchequerCreate />} idx={idx} compState={compState} closeComp={closeEditHandler} mainInit={{title, content}} subInit={{taxation: taxAspect, value: taxValue}} initHeight={`${wrapperRef.current && wrapperRef.current.clientHeight}px`} />
			<div css={WrapperCSS({isEdit, compState})}>
				<CommonListElement idx={idx} dropdownList={dropdownList}>
					<div css={detailWrapperCSS}>
						<div css={taxInfoWrapperCSS}>
							<div css={titleCSS}>{title}</div>
							<div css={separatorCSS} />
							<div css={contentCSS}>{content}</div>
						</div>
						<div>{taxAspect === 0 ? taxPercent : taxAbsolute}</div>
					</div>
				</CommonListElement>
			</div>
			
		</div>
		
	)

	

}


const WrapperCSS = ({isEdit, compState}: {isEdit: boolean, compState: boolean}) => {
	return css`
		transition-duration: ${isEdit ? '0s' : '0.3s'};
		transition-property: opacity;
		opacity: ${isEdit ? '0%' : '100%'};
		position: ${isEdit ? 'absolute;' : 'static'};
	`
}

const detailWrapperCSS = css`
	width: 100%;
	/* display: flex; */
	/* justify-content: space-between; */
	margin-top: 5px;
	/* align-items: center; */
`

const titleCSS = css`
	font-weight: 700;
`

const separatorCSS = css`
	margin: 0px 12px 0px 12px;
	width: 1.5px;
	height: 20px;
	background-color: rgba(0, 0, 0, 0.2);
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

const taxInfoWrapperCSS = css`
	display: flex;
	align-items: center;
	margin-bottom: 8px;
`

const iconCSS = css`
	margin-right: 6px;
`

const valueTextCSS = css`
	font-weight: 700;
`

const taxDescWrapperCSS = css`
	display: flex;
	align-items: center;
	color: var(--teacher-main-color-3);
`


export default GovExchequerDetail
