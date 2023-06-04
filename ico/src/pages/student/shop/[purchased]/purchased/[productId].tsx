import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import React, {useState, useEffect} from "react"
import { css } from "@emotion/react"
import UseAnimations from "react-useanimations"
import radioButton from "react-useanimations/lib/radioButton"
import Button from "@/components/common/Button/Button"
import { useRouter } from "next/router"
import useNavigate from "@/hooks/useNavigate"
import { getPurchasedTransactionType } from "@/types/student/apiReturnTypes"
import { getPurchasedStudentTransactionAPI } from "@/api/student/shop/getPurchasedStudentTransactionAPI"
import { getPurchasedTeacherTransactionAPI } from "@/api/student/shop/getPurchasedTeacherTransactionAPI"

function purchased() {
	const router = useRouter()
	const { purchased, productId } = router.query
	const navigate = useNavigate()

	const [data, setData] = useState<getPurchasedTransactionType>()

	useEffect(() => {
		if (purchased === "teacher") {
			getPurchasedTeacherTransactionAPI({idx: Number(productId)})
			.then((res) => {
				console.log(res)
				setData(() => res)
			})
		} else if (purchased === "student") {
			getPurchasedStudentTransactionAPI({idx: Number(productId)})
			.then((res) => {
				setData(() => res)
			})
		}
	}, [])

	const toShop = () => {
		if (purchased === "teacher") {
			navigate("/student/shop/teacher", "bottomToTop")
		} else if (purchased === "student") {
			navigate("/student/shop/student", "bottomToTop")
		}
	}

	const toCoupon = () => {
		navigate("/student/home/coupon", "bottomToTop")
	}

	return (
		<React.Fragment>
			<PageHeader title={"결제 완료"} />
			<div css={wrapperCSS}>
				<div css={topContentWrapperCSS}>
					<UseAnimations
						animation={radioButton}
						reverse={true}
						size={128}
						css={css`
							margin: 0px 0px 24px 0px;
						`}
					/>
					<span>결제가 완료되었습니다!</span>

					<div css={productInfoWrapperCSS}>
						<div>상품 정보</div>
						{JSON.stringify(data)}
					</div>
				</div>

				
				<div css={buttonWrapperCSS}>
					<Button text={"확인"} fontSize={"var(--student-h3)"} width={"45%"} theme={"mobileSoft2"} onClick={toShop} />
					{data?.type === true && (
						<Button
							text={"쿠폰함"}
							fontSize={"var(--student-h3)"}
							width={"45%"}
							theme={"mobileNormal"}
							onClick={toCoupon}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	)
}

const wrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const topContentWrapperCSS = css`
	width: 100%;
	flex: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const buttonWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: space-around;
`

const productInfoWrapperCSS = css`
	margin-top: 36px;
`

export default purchased
