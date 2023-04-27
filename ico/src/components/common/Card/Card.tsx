import { css } from "@emotion/react"
import Image from "next/image"

type CardProps = {
	image: string
	name: string
	price: number
	number: number
	writer: string
	date: string
}

function Card({ image, name, number, price, writer, date }: CardProps) {
	return (
		<div css={cardCSS}>
			<Image src={image} alt={name} width={250} height={250} />
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

const cardFirstContentCSS = css`
	font-size: var(--teacher-h5);
	padding: 10px 10px 0px;

	div {
		&:nth-child(1) {
			margin-bottom: 5px;
		}
		&:nth-child(2) {
			display: flex;

			div {
				&:nth-child(1) {
					font-weight: bold;
				}
			}
		}
	}
`
const cardSecondContentCSS = css`
	padding: 5px 10px 10px;

	div {
		&:nth-child(1) {
			font-size: 12px;
			display: flex;
			justify-content: space-between;

			div {
				&:nth-child(1) {
					font-weight: bold;
				}
				&:nth-child(2) {
					color: rgba(0, 0, 0, 0.5);
				}
			}
		}
	}
`
export default Card
