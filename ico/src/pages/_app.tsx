import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "@/components/common/Layout/Layout"
import { Provider } from "jotai"
import { mainStore } from "@/store/store"
import { CookiesProvider } from "react-cookie"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import StackNotification from "@/components/common/StackNotification/StackNotification"
import React, {useState} from 'react'

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

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
