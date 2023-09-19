import { css } from "@emotion/react"
import Image from "next/image"
import { useRouter } from "next/router"
import useGetNation from "@/hooks/useGetNation"

type CardProps = {
	baseUrl: string
	id: number
	title: string
	amount: number
	image: string
	sold: number
	count: number
	name: string
	date: string
	assigned: boolean | null
}

function Card({ baseUrl, id, title, amount, image, count, sold, name, date, assigned }: CardProps) {
	const router = useRouter()
	const [nation] = useGetNation()
	const handleClickCard = () => {
		// const currentPath = router.asPath
		// if (currentPath.includes("/teacher/shop/my")) {
		// 	router.push(`/teacher/shop/my/${id}`)
		// } else if (currentPath.includes("/teacher/shop/student")) {
		// 	router.push(`/teacher/shop/student/${id}`)
		// } else if (currentPath.includes("student/shop/teacher")) {
		// 	router.push(`/student/shop/teacher/${id}`)
		// } else if (currentPath.includes("/student/shop/student")) {
		// 	router.push(`/student/shop/student/${id}`)
		// }
		router.push(`${baseUrl}/${id}`)
	}

	const darkCSS = css`
		filter: brightness(100%);
		${count - sold == 0 &&
		css`
			filter: brightness(50%);
		`}
		${assigned == false &&
		css`
			filter: brightness(50%);
		`}
	`

	return (
		<div>
			<div css={[cardCSS, darkCSS]} onClick={handleClickCard}>
				{/* {assigned == false && <div css={[testCSS, cardRequestTextCSS]}>승인 진행 중</div>} */}
				{count - sold === 0 && <div css={[testCSS, cardSoldOutTextCSS]}>sold out</div>}
				<div css={cardImageWrapperCSS}>
					<Image src={image} alt={title} fill={true} />
				</div>
				<div css={cardFirstContentCSS}>
					<div>{title}</div>
					<div>
						<div>
							{amount}
							{nation.currency}
						</div>
						/<div>{count - sold}EA</div>
					</div>
				</div>
				<hr />
				<div css={cardSecondContentCSS}>
					<div css={darkCSS}>
						<div>{name}</div>
						<div>{date}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const cardCSS = css`
	position: relative;
	border-radius: 10px;
	overflow: hidden;
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

	z-index: 2;
`

const cardSoldOutTextCSS = css`
	background-color: var(--teacher-warning-color);
	color: #fff;
	filter: none;
`

const cardRequestTextCSS = css`
	background-color: blue;
	color: #fff;
	filter: none;
`

const cardFirstContentCSS = css`
	font-size: var(--teacher-h5);
	padding: 10px 10px 0px;

	position: relative;

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
	position: relative;

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
