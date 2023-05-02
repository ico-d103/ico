import { css } from "@emotion/react"
import Image from "next/image"

// 상품 갯수가 0개면 sold out
// 승인 대기중인 상품은 boolean으로 관리한다.

type CardProps = {
	image: string
	name: string
	price: number
	number: number
	writer: string
	date: string
	approved: boolean
}

function Card({ image, name, number, price, writer, date, approved }: CardProps) {
	return (
		<div css={cardCSS}>
			<div css={cardImageWrapperCSS}>
				<Image src={image} alt={name} width={250} height={250} />
				{number === 0 ? (
					<div css={cardSoldOutTextCSS}>Sold out</div>
				) : (
					<div css={approved ? cardRequestTextCSS : cardImageTextCSS}>{approved ? "승인중" : "텍스트"}</div>
				)}
			</div>
			<div css={cardFirstContentCSS}>
				<div>{name}</div>
				<div>
					<div>{price}미소</div>/ <div>{number}EA</div>
				</div>
			</div>
			<hr />
			<div css={cardSecondContentCSS}>
				<div>
					<div>{writer}</div>
					<div>{date}</div>
				</div>
			</div>
		</div>
	)
}

const cardCSS = css`
	position: relative; // 부모 요소를 relative로 설정합니다.

	border-radius: 10px;
	overflow: hidden;

	box-shadow: 0px 0px 10px 1px rgba(100, 100, 100, 0.2); /* 그림자 설정 */

	hr {
		height: 1px;
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.2);
	}

	cursor: pointer;
`

const cardImageWrapperCSS = css`
	position: relative;
	display: inline-block;
`

const cardImageTextCSS = css`
	position: absolute;
	top: 10px;
	right: 10px;
	padding: 5px;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	font-size: 12px;
	font-weight: bold;
	border-radius: 5px;
`

const cardSoldOutTextCSS = css`
	position: absolute;
	top: 10px;
	right: 10px;
	padding: 5px;
	background-color: var(--teacher-warning-color);
	color: #fff;
	font-size: 12px;
	font-weight: bold;
	border-radius: 5px;
`

const cardRequestTextCSS = css`
	position: absolute;
	top: 10px;
	right: 10px;
	padding: 5px;
	background-color: blue;
	color: #fff;
	font-size: 12px;
	font-weight: bold;
	border-radius: 5px;
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
