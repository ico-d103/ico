import React, {useEffect} from "react"
import useNavigate from "@/hooks/useNavigate"
import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapperBackup"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { getGovRuleAPI } from "@/api/teacher/gov/getGovRuleAPI"

function test() {
	const navigate = useNavigate()


	return (
		<div>
			<PageHeader title={"아이코"} />
			
			test
			<div css={imgWrapperCSS}>
				<LoadImage src={"/assets/guide/deco_1.jpg"} alt={"guide_deco"} useSkeleton={true} wrapperCss={illustCSS} />
			</div>
			<ContentWrapper wrapperCss={test1()}>낄낄낄</ContentWrapper>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			fdsafsdafsd
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			fdsfsdafdsdaf
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			fdsfsdafdsdaf
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			fdsfsdafdsdaf
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			fdsfsdafdsdaf
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			fdsfsdafdsdaf
			<button
				onClick={() => {
					navigate("/student/test2", "bottomToTop")
				}}
			>
				이동!
			</button>
		</div>
	)
}

const illustCSS = css`
	width: 100%;
	height: 100%;
`

const imgWrapperCSS = css`
	width: 50vw;
	height: 50vw;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	overflow: hidden;
	margin-bottom: 36px;
`

const test1 = () => {
	return css`
		width: 200px;
		height: 200px;
	`
}

export default test
