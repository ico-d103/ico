import React from "react"
import { navTo, isNavigating } from "@/store/store"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

function useNavigate() {
	const router = useRouter()
	const [navToAtom, setNavToAtom] = useAtom(navTo)
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)

	function navigate(url: string, transition = "rightToLeft") {
		if (router.pathname !== url && navToAtom.url === "") {
			sessionStorage.setItem(
				`__next_scroll_${window.history.state.key}`,
				JSON.stringify({
					x: window.pageXOffset,
					y: window.pageYOffset,
				}),
			)

			setNavToAtom(() => {
				return { url, transition }
			})
			if (url !== "" && transition !== "") {
				setIsNavigatingAtom(() => true)
			}
		}
	}

	return navigate
}

export default useNavigate
