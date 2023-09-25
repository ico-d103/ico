import Button from "@/components/common/Button/Button"
import React, { useState, useEffect } from "react"
import QRScanner from "./QRScanner"
import { css } from "@emotion/react"
import { basketType } from "../useShopHandler";

function QRScannerModal({ closeComp, compState, seller, products }: { closeComp?: Function; compState: boolean; seller: string; products: basketType }) {
	const [unmount, setUnmount] = useState<boolean>(false)
	const [productsBody, setProductsBody] = useState<{id: number, count: number}[]>()

	useEffect(() => {
		const productsBody = products.map((el) => {
			return {id: el.id, count: el.count}
		})

		setProductsBody(() => productsBody)
	}, [])

	useEffect(() => {
		if (compState === false) {
			setTimeout(() => {
				setUnmount(() => true)
			}, 300)
		} else {
			setUnmount(() => false)
		}
	}, [compState])

	return (
		<div css={wrapperCSS}>
			{unmount === false && productsBody && <QRScanner closeComp={closeComp} seller={seller} products={productsBody} />}
			<div css={buttonWrapperCSS}>
				<Button
					text={"취소"}
					fontSize={"var(--student-h3)"}
					width={"40%"}
					theme={"mobileCancel"}
					onClick={() => {
						closeComp && closeComp()
					}}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 90vw;
	border-radius: 10px;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
	background-color: white;
	overflow: hidden;
`

const buttonWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
`

export default QRScannerModal
