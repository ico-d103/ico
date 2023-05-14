import { css } from "@emotion/react"
import Image from "next/image"
import { useRouter } from "next/router"
// 상품 갯수가 0개면 sold out
// 승인 대기중인 상품은 boolean으로 관리한다.

type CardProps = {
	id: string
	title: string
	amount: number
	image: string
	sold: number
	count: number
	name: string
	date: string
	assigned: boolean | null
}

function Card({ id, title, amount, image, count, sold, name, date, assigned }: CardProps) {
	const router = useRouter()

	const handleClickCard = () => {
		const currentPath = router.asPath
		if (currentPath.includes("/teacher/shop/my")) {
			router.push(`/teacher/shop/my/${id}`)
		} else if (currentPath.includes("/teacher/shop/student")) {
			router.push(`/teacher/shop/student/${id}`)
		} else if (currentPath.includes("student/shop/teacher")) {
			router.push(`/student/shop/teacher/${id}`)
		} else if (currentPath.includes("/student/shop/student")) {
			router.push(`/student/shop/student/${id}`)
		}
	}

	console.log(router.asPath)

	return (
		<div css={cardCSS} onClick={handleClickCard}>
			<div css={cardImageWrapperCSS}>
				<Image src={image} alt={title} layout="fill" />
				{router.asPath === "/teacher/shop/student" && assigned == false && (
					<div css={[testCSS, cardRequestTextCSS]}>승인 진행 중</div>
				)}
				{router.asPath !== "/teacher/shop/student" && count - sold === 0 && (
					<div css={[testCSS, cardSoldOutTextCSS]}>sold out</div>
				)}
			</div>
			<div css={cardFirstContentCSS}>
				<div>{title}</div>
				<div>
					<div>{amount}미소</div>/<div>{count - sold}EA</div>
				</div>
			</div>
			<hr />
			<div css={cardSecondContentCSS}>
				<div>
					<div>{name}</div>
					<div>{date}</div>
				</div>
			</div>
		</div>
	)
}

const cardCSS = css`
	position: relative;
	border-radius: 10px;
	overflow: hidden;
	/* 일단은 모바일에서도 카드 뒷부분은 하얀색으로 */
	background-color: white;

	box-shadow: 0px 0px 10px 1px rgba(100, 100, 100, 0.2);

	hr {
		height: 1px;
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.2);
	}
	cursor: pointer;
`

const cardImageWrapperCSS = css`
	/* 카드 길이 수정 부분 */
	width: 250px;
	height: 250px;

	position: relative;

	@media screen and (max-width: 500px) {
		width: 45vw;
		height: 45vw;
	}
`

const testCSS = css`
	position: absolute;
	top: 10px;
	right: 10px;
	padding: 5px;
	font-size: 12px;
	font-weight: bold;
	border-radius: 5px;
`

const cardSoldOutTextCSS = css`
	background-color: var(--teacher-warning-color);
	color: #fff;
`

const cardRequestTextCSS = css`
	background-color: blue;
	color: #fff;
`

const cardFirstContentCSS = css`
	font-size: var(--teacher-h5);
	padding: 10px 10px 0px;

	div {
		&:nth-of-type(1) {
			margin-bottom: 5px;
		}
		&:nth-of-type(2) {
			display: flex;

			div {
				&:nth-of-type(1) {
					font-weight: bold;
				}
			}
		}
	}
`
const cardSecondContentCSS = css`
	padding: 5px 10px 10px;

	div {
		&:nth-of-type(1) {
			font-size: 12px;
			display: flex;
			justify-content: space-between;

			div {
				&:nth-of-type(1) {
					font-weight: bold;
				}
				&:nth-of-type(2) {
					color: rgba(0, 0, 0, 0.5);
				}
			}
		}
	}
`
export default Card
