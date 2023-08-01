import React, { useEffect } from "react"
import { css } from "@emotion/react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import HomeJobCard from "@/components/student/Home/JobCard/HomeJobCard"
import HomeAsset from "@/components/student/Home/Asset/HomeAsset"
import HomeGradationButton from "@/components/student/Home/GradationButton/HomeGradationButton"
import HomeButtonSection from "@/components/student/Home/GradationButton/HomeButtonSection"
import HomeTipSection from "@/components/student/Home/Tip/HomeTipSection"
import { getHomeMyInfoAPI } from "@/api/student/home/getHomeMyInfoAPI"
import { getHomeMyInfoType } from "@/types/student/apiReturnTypes"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import SideMenu from "@/components/student/Home/SideMenu/SideMenu"
import useModal from "@/components/common/Modal/useModal"

function index() {
	// const [openComp, closeComp, compState] = useCompHandler()
	const modal = useModal("rightToLeft")
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getHomeMyInfoType>(
		["student", "homeMyInfo"],
		getHomeMyInfoAPI,
		// { staleTime: 200000 },
	)

	return (
		<div>
			<div css={contentParentCSS}>
				{/* {data && (
					<Modal
						closeComp={closeComp}
						compState={compState}
						content={<SideMenu data={data} />}
						transition={"rightToLeft"}
					/>
				)} */}
				{modal(
					<>
						{data && <SideMenu data={data} />}
					</>
					
				)}
				<div css={headerWrapperCSS}>
					<div css={logoWrapperCSS}>
						<LoadImage
							src={"/assets/children_icon.png"}
							alt={"icon"}
							wrapperCss={css`
								width: 36px;
								height: 36px;
								margin-right: 12px;
							`}
							sizes={"128px"}
						/>
						ICO
					</div>
					<div />
					<div onClick={modal.open} css={sideMenuButtonWrapperCSS}>
						<img
							src={"/assets/side_menu/student_menu_icon.png"}
							css={css`
								width: 36px;
								height: auto;
							`}
						/>
					</div>
				</div>

				<div css={homeContentWrapperCSS} className={'home-content'}>
					<ContentWrapper>
						<div css={contentTitleCSS}>내 프로필</div>
						{data && (
							<HomeJobCard
								name={data.name}
								job={data.jobName}
								credit={data.creditRating}
								backgroundColor={data.color !== null ? data.color : "#634AFF"}
								imgUrl={
									data.jobImage !== null ? data.jobImage : "https://d3bkfkkihwj5ql.cloudfront.net/worker_male.png"
								}
							/>
						)}
					</ContentWrapper>
					{data && (
						<ContentWrapper>
							<div css={contentTitleCSS}>자산</div>
							<HomeAsset account={data.account} deposit={data.deposit} invest={data.invest} />
						</ContentWrapper>
					)}
					<HomeButtonSection />
					<HomeTipSection />
				</div>
			</div>
		</div>
	)
}

// export async function getServerSideProps() {
// 	return {
// 	  props: {},
// 	};
//   }

const contentTitleCSS = css`
	font-size: var(--student-h2);
	font-weight: 700;
`
const contentParentCSS = css`
	/* background-color: red; */
	display: flex;
	flex-direction: column;
	align-items: center;
`

const headerWrapperCSS = css`
	width: 90%;
	height: 64px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const logoWrapperCSS = css`
	font-size: var(--student-h1);
	font-weight: 700;
	display: flex;
	align-items: center;
	color: #5aa9006a;


	@media (max-width: 768px) {

	}
	
	@media (min-width: 769px) {
		display: none;
	}
`

const sideMenuButtonWrapperCSS = css`
	width: 64px;
	height: 64px;
	display: flex;
	justify-content: flex-end;
	align-items: center;

	/* @media (max-width: 1280px) {

	} */

	@media (min-width: 1281px) {
		display: none;
	}
`

const homeContentWrapperCSS = css`
	@media (max-width: 1024px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	
	@media (min-width: 1025px) {
		/* margin-left: 16px; */
		min-width: 568px;
		max-width: 1024px;
		width: 60vw;
		display: grid;
		grid-template-columns: 50% 50%;
		/* place-items: center; */
		justify-items: center;
	}
`
export default index
