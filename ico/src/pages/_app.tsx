import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "@/components/common/Layout/Layout"
import { css } from "@emotion/react"
import { useRef, useEffect } from "react"
import { OverlayScrollbars } from "overlayscrollbars"
import { Provider } from "jotai"
import { mainStore } from "@/store/store"
import { CookiesProvider } from "react-cookie"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useQuery } from "@tanstack/react-query"
import StackNotification from "@/components/common/StackNotification/StackNotification"
import { getCookie } from "@/api/cookie"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()
	const router = useRouter()

	useEffect(() => {
		if (getCookie("Authorization") === undefined) {
			// 처음 접근할 때 토큰이 없다면 로그인 페이지로 이동
			router.push("/teacher/login")
		}
	}, [])

	return (
		<CookiesProvider>
			<QueryClientProvider client={queryClient}>
				<Provider store={mainStore}>
					<StackNotification />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>

				<ReactQueryDevtools />
			</QueryClientProvider>
		</CookiesProvider>
	)
}
