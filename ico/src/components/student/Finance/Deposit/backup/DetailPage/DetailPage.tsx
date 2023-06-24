// import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
// import React from "react"
// import { css } from "@emotion/react"
// import { getFinanceDepositRateType } from "@/types/student/apiReturnTypes"
// import useGetNation from "@/hooks/useGetNation"
// import Button from "@/components/common/Button/Button"
// import Modal from "@/components/common/Modal/Modal"
// import ModalContent from "@/components/common/Modal/ModalContent"
// import FinanceDepositDeleteModal from "../Modal/FinanceDepositDeleteModal"
// import useCompHandler from "@/hooks/useCompHandler"
// import { deleteFinanceDepositAPI } from "@/api/student/finance/deleteFinanceDepositAPI"
// import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
// import useNotification from "@/hooks/useNotification"
// import useNavigate from "@/hooks/useNavigate"

// const APPLY_ICON = (
// 	<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
// 		<path
// 			d="M24.9993 29V17M18.9992 23H30.9993M24.9993 40C34.3881 40 41.9992 32.3888 41.9992 23C41.9992 13.6112 34.3881 6 24.9993 6C15.6104 6 7.99925 13.6112 7.99925 23C7.99925 24.9 8.31094 26.7272 8.88599 28.4332C9.10239 29.0752 9.21059 29.3962 9.2301 29.6429C9.24938 29.8864 9.23481 30.0571 9.17456 30.2939C9.11354 30.5336 8.97884 30.783 8.70944 31.2816L5.43812 37.3367C4.9715 38.2004 4.73819 38.6323 4.79041 38.9655C4.83589 39.2558 5.00674 39.5115 5.2576 39.6645C5.5456 39.8402 6.03385 39.7897 7.01033 39.6887L17.2524 38.63C17.5625 38.598 17.7176 38.5819 17.859 38.5873C17.998 38.5927 18.0961 38.6057 18.2317 38.637C18.3696 38.6687 18.5429 38.7355 18.8896 38.8691C20.7857 39.5996 22.8457 40 24.9993 40Z"
// 			stroke="black"
// 			stroke-width="3"
// 			stroke-linecap="round"
// 			stroke-linejoin="round"
// 		/>
// 	</svg>
// )


// type DetailPageProps = {
// 	data: getFinanceDepositRateType
//   refetch: Function
// }

// function DetailPage({ data, refetch }: DetailPageProps) {
// 	const [nation] = useGetNation()
//   const [openComp, closeComp, compState] = useCompHandler()
//   const noti = useNotification()
//   const navigate = useNavigate()

//   const getDateDiff = (d1: string, d2: null | string) => {
//     const date1 = new Date(d1);
//     let date2
//     if (d2 !== null) {
//       date2 = new Date(d2);
//     } else {
//       date2 = new Date();
//     }

    
//     const diffDate = date1.getTime() - date2.getTime();
    
//     return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24))); // 밀리세컨 * 초 * 분 * 시 = 일
//   }

//   const rangeDate = getDateDiff(data.myDeposit.endDate, data.myDeposit.startDate)
//   const restDate = getDateDiff(data.myDeposit.endDate, null)


//   const submitHandler = () => {
// 		deleteFinanceDepositAPI({}).then((res) => {
// 			refetch()
// 			noti({content: <NotiTemplate type={'ok'} content="예금 만기 수령을 했어요!" buttons={[{label: '내역 보기', function: () => {navigate('/student/home/asset', 'bottomToTop')}}]}/>, width: '300px', height: '120px', duration: 3000})
// 			closeComp()
// 		})
// 		.catch((err) => {
// 			console.log(err)
// 			noti({content: <NotiTemplate type={'alert'} content="예금 만기 수령에 실패했어요!"/>, width: '300px', height: '120px', duration: 3000})
// 		})
// 	}

// 	return (
//     <React.Fragment>
//       {data && (
// 				<Modal
// 					content={
// 						<ModalContent
// 							width={"300px"}
// 							title={"예금 중도 해지"}
// 							titleSize={"var(--student-h1)"}
// 							icon={APPLY_ICON}
// 							content={<FinanceDepositDeleteModal refetch={refetch} closeComp={closeComp}/>}
// 							forChild={true}
// 						/>
// 					}
// 					compState={compState}
// 					closeComp={closeComp}
// 					transition={"scale"}
// 				/>
			
// 			)}

// <div css={wrapperCSS}>
// 			<ContentWrapper>
// 				<div css={lSizeFontCSS}>
// 					{data.myDeposit.amount.toLocaleString('ko-KR')} {nation?.currency}
// 				</div>
// 				<div css={diffLabelCSS}>
// 					+{data.myDeposit.depositAmount.toLocaleString('ko-KR')} {nation?.currency}
// 				</div>
// 			</ContentWrapper>
//       <ContentWrapper>
//       <div css={lSizeFontCSS}>예금 기간</div>
//       <div css={dateLabelWrapperCSS}>
//         <div css={guideMentCSS}>
//         예금 만기까지 <span css={css`font-weight: 700;`}>{restDate}일</span> 남았어요!
//         </div>
//         <div css={endDateCSS}>
//           {data.myDeposit.endDate}
//         </div>
//       </div>
//       <div css={barWrapperCSS}>
//         <div css={barCSS({rangeDate, restDate})}/>
//       </div>
//       </ContentWrapper>
//       <ContentWrapper>
//       <div css={lSizeFontCSS}>추가 정보</div>

//       <div css={adtitleCSS}>
//       상품 가입 시 신용등급
//       </div>
//       <div css={adContentCSS}>
//         {data.myDeposit.creditRating}등급
//       </div>
//       <div css={adtitleCSS}>
//       현재 상품의 이자율
//       </div>
//       <div css={adContentCSS}>
//         {data.myDeposit.interest}%
//       </div>
//       </ContentWrapper>

//       {data.myDeposit.startDate === data.myDeposit.endDate ?
//               <Button
// 					text={"만기 수령"}
// 					fontSize={`var(--student-h3)`}
// 					width={"48%"}
// 					theme={"vividPositive"}
//           margin={'24px 0px 0px 0px'}
// 					onClick={() => {
//             submitHandler()
						
// 					}}
// 				/>
//         :
//         <Button
// 					text={"중도 해지"}
// 					fontSize={`var(--student-h3)`}
// 					width={"48%"}
// 					theme={"mobileWarning"}
//           margin={'24px 0px 0px 0px'}
// 					onClick={() => {
//             openComp()
						
// 					}}
// 				/>

//       }
// 		</div>
//     </React.Fragment>
		
// 	)
// }

// const wrapperCSS = css`
// 	width: 100%;
// 	height: 100%;
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// `

// const lSizeFontCSS = css`
// 	font-size: var(--student-h1);
// 	font-weight: 700;
//   margin-bottom: 6px;
// 	/* line-height: 150%; */
// `

// const mSizeFontCSS = css`
// 	font-size: var(--student-h2);
// 	font-weight: 700;
// 	line-height: 150%;
// `



// const adtitleCSS = css`
// margin-top: 14px;
// margin-bottom: 4px;
//   font-size: var(--student-h4);
//   color: rgba(0, 0, 0, 0.6);
// 	font-weight: 700;

// `

// const adContentCSS = css`


//   font-size: var(--student-h3);
//   color: var(--student-main-color-5);
// 	font-weight: 700;

// `

// const diffLabelCSS = css`
// 	font-size: var(--student-h3);
// 	font-weight: 700;
// 	color: #0066ff;
// `

// const dateLabelWrapperCSS = css`
//   display: flex;
//   justify-content: space-between;
//   align-items: end;
//   margin: 12px 0px; 
// `

// const guideMentCSS = css`
//   font-size: var(--student-h3);
// `

// const endDateCSS = css`
//   font-size: var(--student-h4);
//   color: rgba(0, 0, 0, 0.6);
// `

// const barWrapperCSS = css`
//   width: 100%;
//   height: 64px;
//   border-radius: 10px;
//   background-color: rgba(0, 0, 0, 0.1);
//   /* margin: 0px 0px 0px 0px; */
//   overflow: hidden;
// `

// const barCSS = ({rangeDate, restDate}: {rangeDate: number; restDate: number}) => {
//   return css`
//     width: ${Math.floor((rangeDate - restDate) / rangeDate * 100)}%;
//     height: 100%;
//     border-radius: 10px;
//     background: linear-gradient( to left, var(--student-main-color-4), var(--student-main-color-5) );
//   `
// }

// export default DetailPage
