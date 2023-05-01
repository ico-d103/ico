import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "@/components/common/Layout/Layout"
import { css } from "@emotion/react"
import { useRef, useEffect } from "react"
import { OverlayScrollbars } from "overlayscrollbars"
import { Provider } from "jotai"
import mainStore from "@/store/store"


export default function App({ Component, pageProps }: AppProps) {
	// useEffect(() => {
	// 	const osInstance = OverlayScrollbars(document.querySelector("body") as HTMLBodyElement, {})
	// }, [])
	return (
		<Provider store={mainStore}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}
