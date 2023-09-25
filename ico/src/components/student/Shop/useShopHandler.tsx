import React, { useEffect, useState } from "react"
import { cloneDeep } from "lodash"

export type shoppingBasketType = {
	seller: string | null
	basket: basketType
}

export type basketType = { id: number; count: number; title: string; amount: number; image: string }[]

function useShopHandler() {
	const [shoppingBasket, setShoppingBasket] = useState<shoppingBasketType>({
		seller: null,
		basket: [],
	})

	useEffect(() => {
		const getLocal = window.localStorage.getItem("shopping_basket")
		if (getLocal) {
			const shoppingBasket = JSON.parse(getLocal) as shoppingBasketType
			if (shoppingBasket.basket.length !== 0) {
				setShoppingBasket(() => shoppingBasket)
			}
		}
	}, [])

	useEffect(() => {
		if (shoppingBasket.basket.length !== 0) {
			window.localStorage.setItem("shopping_basket", JSON.stringify(shoppingBasket))
		}
		console.log(shoppingBasket)
	}, [shoppingBasket])

	const delProduct = ({ id }: { id: number }) => {
		setShoppingBasket((prev) => {
			const newList = prev.basket.filter((el) => el.id !== id)
			if (newList.length !== 0) {
				return { ...prev, basket: [...newList] }
			} else {
				window.localStorage.setItem("shopping_basket", JSON.stringify({ seller: null, basket: [] }))
				return { seller: null, basket: [] }
			}
		})
	}

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
				const newList = prev.basket.filter((el) => el.id !== id)
				return { seller, basket: [...newList, { id, count, title, amount, image }] }
			})
		} else {
			setShoppingBasket(() => {
				return { seller, basket: [{ id, count, title, amount, image }] }
			})
		}
	}

	return { shoppingBasket, addProducts, delProduct }
}

export default useShopHandler
