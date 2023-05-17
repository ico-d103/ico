import { css } from "@emotion/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import Carousel from "@/components/common/Carousel/Carousel"
import QRCode from "react-qr-code"

import { getStudentProductDetailAPI } from "@/api/common/shop/getStudentProductDetailAPI"
import { getStudentProductDetailType } from "@/types/teacher/apiReturnTypes"
import QRScanner from "@/components/student/Shop/QRScanner/QRScanner"
import useGetNation from "@/hooks/useGetNation"
import Button from "@/components/common/Button/Button"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import ShowQR from "@/components/common/ShowQR/ShowQR"
import { useState } from "react"
import { postAllowedStudentProposalAPI } from "@/api/teacher/shop/postAllowedStudentProposalAPI"
import { deleteDeniedStudentProposalAPI } from "@/api/teacher/shop/deleteDeniedStudentProposalAPI"

function product() {
	const router = useRouter()
	const { pid } = router.query
	const productId = typeof pid === "string" ? pid : ""
	const [nation] = useGetNation()
	const [openComp, closeComp, compState] = useCompHandler()
	const [time, setTime] = useState<number>(0)

	const { data } = useQuery<getStudentProductDetailType>(["product", productId], () =>
		getStudentProductDetailAPI({ pid: productId }),
	)

	const allowedProposal = () => {
		postAllowedStudentProposalAPI({ pid: productId }).then((res) => {
			router.push("/teacher/shop/student")
		})
	}

	const deniedProposal = () => {
		deleteDeniedStudentProposalAPI({ pid: productId }).then((res) => {
			router.push("/teacher/shop/student")
		})
	}

	const imageElements = data?.images?.map((imageUrl: any) => (
		<img
			src={imageUrl}
			css={css`
				width: auto;
				height: 60vh;
				border-radius: 10px;
			`}
		/>
	))

	const generateTime = () => {
		setTime(() => new Date().getTime())
	}

	console.log(imageElements)

	return (
		<div css={wrapperCSS}>
			{/* {data && (
				<Modal
					closeComp={closeComp}
					compState={compState}
					transition={"scale"}
					content={<ShowQR type={'ico_purchase'} id={data?.id} time={time} />}
				/>
			)} */}
			<div css={headerCSS}>
				<div css={productCSS}>
					<div css={titleWrapperCSS}>
						<div>{data?.title}</div>

						{data?.assigned && (
							<Button
								text={"상품 삭제"}
								fontSize={"var(--teacher-h5)"}
								width={"140px"}
								theme={"warning"}
								onClick={deniedProposal}
							/>
						)}

						{!data?.assigned && (
							<div
								css={css`
									display: flex;
									gap: 8px;
								`}
							>
								<Button
									text={"상품 승인"}
									fontSize={"var(--teacher-h5)"}
									width={"140px"}
									theme={"vividPositive"}
									onClick={allowedProposal}
								/>
								<Button
									text={"상품 반려"}
									fontSize={"var(--teacher-h5)"}
									width={"140px"}
									theme={"warning"}
									onClick={deniedProposal}
								/>
							</div>
						)}
					</div>
					{/* 이름 getnation으로 선생님이름 받아올까 생각중 */}
					<hr />
					{/* <div css={css`width: 100%; height: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.2);`}/> */}
				</div>
				<div css={QRcss}>{/* <QRCode value={`/student/teacher/buy/${new Date().getTime()}`} size={128} /> */}</div>
			</div>

			<div css={parentCSS}>
				<Carousel content={imageElements} identifier={"teacher"} />
			</div>

			<div css={footerCSS}>
				{data && (
					<div css={adinfoWrapperCSS}>
						<div css={amountWrapperCSS}>
							<div css={decoCSS} />
							상품 정보
						</div>

						<div css={priceCSS}>
							{data?.amount?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} {nation.currency}
						</div>
						<div
							css={css`
								display: flex;
							`}
						>
							<div css={leftWrapperCSS}>{data?.count - data?.sold}개 남음 </div>
							<div css={leftWrapperCSS}>&nbsp; · {data.date}에 등록된 상품입니다.</div>
						</div>
					</div>
				)}
				<div css={lineCSS} />
				<div css={detailLabelWrapperCSS}>
					<div css={decoCSS} />
					상품 상세 설명
				</div>
				<div>{data?.detail}</div>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: grid;
	grid-column: 100%;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;

	grid-gap: 0;
`

const headerCSS = css`
	display: flex;
	margin-bottom: 10px;
`

const productCSS = css`
	width: 100%;
	height: 100%;

	> div {
	}

	> hr {
		border: 1px solid rgba(0, 0, 0, 0.1);
		margin-bottom: 10px;
	}

	> div:nth-of-type(1) {
		font-size: 2rem;
		font-weight: bold;

		margin-bottom: 5px;
	}

	> div:nth-of-type(2) {
		font-size: 1.1rem;
		color: rgba(0, 0, 0, 0.8);

		margin-bottom: 30px;
	}

	> div:nth-of-type(3) {
		display: flex;
		justify-content: space-between;
		align-items: center;

		> div:nth-of-type(1) {
			font-size: 1.5rem;
			font-weight: bold;
		}

		> div:nth-of-type(2) {
			font-size: 1.1rem;
		}
	}
`

const QRcss = css`
	margin-left: 20px;
`

const parentCSS = css`
	overflow: scroll;

	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: transparent;
	}
`

const footerCSS = css`
	/* display: flex;
	justify-content: space-between;
	align-items: center; */
	overflow: hidden;
	width: 100%;
	/* > div:nth-of-type(1) {
		> div:nth-of-type(1) {
			
		}
		> div:nth-of-type(2) {

		}
		width: 70%;
	}

	> div:nth-of-type(2) {
		display: flex;
		width: 30%; 
	} */
`

const adinfoWrapperCSS = css`
	/* display: flex; */
	/* justify-content: space-between; */
	width: 100%;
`

const amountWrapperCSS = css`
	font-size: 1.4rem;
	font-weight: 600;
	height: 24px;
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 21px;
	margin-top: 36px;
`

const priceCSS = css`
	font-size: 1.2rem;
	font-weight: 700;
	color: var(--teacher-highlight-color);

	margin-bottom: 8px;
`

const detailLabelWrapperCSS = css`
	height: 24px;
	display: flex;
	align-items: center;
	gap: 12px;
	margin-top: 16px;
	font-size: 1.4rem;
	font-weight: 600;
	margin-bottom: 21px;
`

const leftWrapperCSS = css`
	color: rgba(0, 0, 0, 0.6);
	font-size: var(--teacher-h5);
	font-weight: 500;
	margin-bottom: 4px;
`

const titleWrapperCSS = css`
	display: flex;
	width: 100%;
	justify-content: space-between;
`

const decoCSS = css`
	height: 100%;
	width: 12px;
	border-radius: 2px;
	background-color: var(--teacher-highlight-color);
`

const lineCSS = css`
	width: 100%;
	height: 1px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	margin-top: 24px;
	margin-bottom: 24px;
`

export default product
