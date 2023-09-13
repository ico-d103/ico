import React, { useEffect, useState } from "react"

type shoppingBasketType = {
	seller: string | null
	basket: { id: number; count: number; title: string; amount: number; image: string }[]
}

function useShopHandler() {
	const [shoppingBasket, setShoppingBasket] = useState<shoppingBasketType>({
		seller: null,
		basket: [],
	})

	useEffect(() => {
		const getSession = window.sessionStorage.getItem("shopping_basket")
		if (getSession) {
			const shoppingBasket = JSON.parse(getSession) as shoppingBasketType
			setShoppingBasket(() => shoppingBasket)
		}
	}, [])

  useEffect(() => {
    window.sessionStorage.setItem("shopping_basket", JSON.stringify(shoppingBasket))
  }, [shoppingBasket])

	const addProducts = ({
		seller,
		id,
		count,
		title,
		amount,
		image,
	}: {
		seller: string
		id: number
		count: number
		title: string
		amount: number
		image: string
	}) => {
		if (shoppingBasket.seller === null || shoppingBasket.seller === seller) {
			setShoppingBasket((prev) => {
				return { seller, basket: [...prev.basket, { id, count, title, amount, image }] }
			})
		} else {
      setShoppingBasket(() => {
				return { seller, basket: [{ id, count, title, amount, image }] }
			})
    }
	}

  return {shoppingBasket, addProducts}
}

export default useShopHandler
