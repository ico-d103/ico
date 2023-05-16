import { css } from "@emotion/react"
import { CLASS_PROPERTY } from "@/components/teacher/Class/ClassIcons"
import PropertyList from "@/components/teacher/Class/Property/ClassPropertyList"
import Pagination from "@/components/teacher/common/Pagination/Pagination"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import ClassPropertyUseModalContent from "@/components/teacher/Class/Property/ClassPropertyUseModalContent"
import ModalContent from "@/components/common/Modal/ModalContent"
import { CLASS_BIG_PROPERTY } from "@/components/teacher/Class/ClassIcons"
import { useQuery } from "@tanstack/react-query"
import { getNationTreasuryAPI } from "@/api/teacher/class/getNationTreasuryAPI"
import { getNationTreasuryType, getTreasuryHistoryType } from "@/types/teacher/apiReturnTypes"
import KebabMenu from "@/components/teacher/common/KebabMenu/KebabMenu"
import { isDepositMenuOpen } from "@/store/store"
import { useAtom, useAtomValue } from "jotai"
import { getTreasuryHistoryAPI } from "@/api/teacher/class/getTreasuryHistoryAPI"
import { selectedPage } from "@/store/store"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import useGetNation from "@/hooks/useGetNation"

function property() {
	const [nation] = useGetNation()
	const [openComp, closeComp, compState] = useCompHandler()
	const [isDepositMenuOpenAtom, setIsDepositMenuOpenAtom] = useAtom(isDepositMenuOpen)
	const selectedPageAtom = useAtomValue(selectedPage)

	const treasury = useQuery<getNationTreasuryType>(["property"], getNationTreasuryAPI)
	const treasuryList = useQuery<getTreasuryHistoryType>(["propertyList", selectedPageAtom], () =>
		getTreasuryHistoryAPI({ page: selectedPageAtom }),
	)

	const openModal = (flag: boolean) => {
		// flag: true면 입금, false면 출금
		if (flag) setIsDepositMenuOpenAtom(true)
		else setIsDepositMenuOpenAtom(false)

		openComp()
	}

	const dropdownList = [
		{
			name: "deposit",
			content: null,
			label: "국고 입금",
			function: () => openModal(true),
		},
		{
			name: "withdrawal",
			content: null,
			label: "국고 출금",
			function: () => openModal(false),
		},
	]

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<h1>국고</h1>
				<KebabMenu dropdownList={dropdownList} />
			</div>
			<div css={titleCSS}>
				<div>{CLASS_PROPERTY}</div>
				<div>
					현재{" "}
					<b>
						{treasury.data?.treasury} {nation.currency}
					</b>
					가 국고에 있어요.
				</div>
			</div>
			<div css={contentCSS}>
				<div>
					<h3 css={contentTitleCSS}>국고 입출금 내역</h3>
				</div>
				{treasuryList.data?.page.length === 0 ? (
					<div css={noneWrapperCSS}>
						<UseAnimations animation={alertCircle} size={300} strokeColor={"rgba(0,0,0,0.4)"} />
						<h1>입출금 내역이 없습니다.</h1>
					</div>
				) : (
					<PropertyList propertyList={treasuryList.data?.page ? treasuryList.data.page : []} />
				)}
			</div>
			<Pagination size={treasuryList.data?.size ? treasuryList.data.size : 1} />
			<Modal
				compState={compState}
				closeComp={closeComp}
				transition={"scale"}
				content={
					<ModalContent
						width={"500px"}
						icon={CLASS_BIG_PROPERTY}
						title={isDepositMenuOpenAtom ? "국고 입금하기" : "국고 출금하기"}
						titleSize={"var(--teacher-h2)"}
						content={
							<ClassPropertyUseModalContent closeComp={closeComp} isDepositMenuOpenAtom={isDepositMenuOpenAtom} />
						}
					/>
				}
			/>
		</div>
	)
}

export async function getServerSideProps() {
	return {
		props: {},
	}
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`

const noneWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h1 {
		font-size: var(--teacher-h2);
	}
`

const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	> h1 {
		font-size: var(--teacher-h1);
		font-weight: bold;
	}
`

const titleCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 30px;

	> div:nth-of-type(1) {
		margin-right: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	> div:nth-of-type(2) {
		font-size: var(--teacher-h2);

		> b {
			font-weight: bold;
			color: var(--teacher-main-color);
		}
	}
`

const contentCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const contentTitleCSS = css`
	margin-top: 30px;
	padding: 10px;
	display: inline-block;
	border-bottom: 2px solid #064f32;
	font-size: var(--teacher-h3);
	font-weight: bold;
	color: var(--teacher-main-color);
`

export default property
