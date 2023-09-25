import React,{ useMemo} from "react"
import useShopHandler from "../useShopHandler"
import ContentWrapper from "../../common/ContentWrapper/ContentWrapper"
import { css } from "@emotion/react"
import ShopBasketItem from "./ShopBasketItem"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"
import Button from "@/components/common/Button/Button"
import QRScannerModal from "../QRScanner/QRScannerModal"
import useModal from "@/components/common/Modal/useModal"
import QueryAdapter from "@/components/common/Adapter/QueryAdapter"

function ShopBasket() {
	const shopHandler = useShopHandler()
  const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
  const scanQRModal = useModal()

  const renderItem = shopHandler.shoppingBasket.basket.map((item, idx) => {
    return <ShopBasketItem key={`${shopHandler.shoppingBasket.basket.length}-${item.title}-${item.id}-${idx}`} {...item} delProduct={shopHandler.delProduct} />
  })

	return (
		<div css={contentWrapperCSS}>
      {shopHandler.shoppingBasket.seller && scanQRModal(
				<QRScannerModal compState={scanQRModal.state} seller={shopHandler.shoppingBasket.seller} products={shopHandler.shoppingBasket.basket}  />
			)}
			<ContentWrapper cssProps={css`
						flex: 1;
						display: flex;
						flex-direction: column;
						
					`}>
        <QueryAdapter isSuccess={true} isFetching={false} isError={false} isEmpty={!shopHandler.shoppingBasket.basket.length}>
        {shopHandler.shoppingBasket.seller &&
        <div css={headerCSS}>
          <span css={css`font-weight: 700;`}>{shopHandler.shoppingBasket.seller === '선생님' ? '선생님 / 도매상인' : shopHandler.shoppingBasket.seller}</span>을 찾아가 QR 코드를 찍어주세요!
        </div>}
          {renderItem}
        </QueryAdapter>
      </ContentWrapper>

      {isNavigatingAtom === false && (
				<div css={navBarOverlayCSS}>
					<Button
						text={"이 상품들을 구매할게요!"}
						fontSize={`var(--student-h3)`}
						width={"100%"}
						theme={"mobileSoft"}
						onClick={scanQRModal.open}
					/>
				</div>
			)}
		</div>
	)
}

const contentWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
  padding-bottom: 64px;;
`

const headerCSS = css`
font-size: 18px;
margin-bottom: 16px;;
word-break: keep-all;
line-height: 140%;

`

const navBarOverlayCSS = css`
	/* width: 100%; */
	width: var(--student-full-width);
	height: 64px;
	background-color: var(--student-main-color);
	position: fixed;
	bottom: 0;
	z-index: 99999999;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 16px;

	opacity: 0%;
	animation: fadein 0.2s ease-in forwards;

	@keyframes fadein {
		from {
			opacity: 0%;
		}

		to {
			opacity: 100%;
		}
	}
`

export default ShopBasket
