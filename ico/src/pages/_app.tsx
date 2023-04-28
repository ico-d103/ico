import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "@/components/common/Layout/Layout"
import { css } from "@emotion/react"
import { useOverlayScrollbars } from "overlayscrollbars-react"
import { useRef, useEffect } from "react"
import { OverlayScrollbars } from "overlayscrollbars"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function App({ Component, pageProps }: AppProps) {

	useEffect(() => {
		const osInstance = OverlayScrollbars(document.querySelector('body') as HTMLBodyElement, {});
	}, [])
	return (
		<Layout>
			
			<Component {...pageProps} />
			
		</Layout>
	)
}
