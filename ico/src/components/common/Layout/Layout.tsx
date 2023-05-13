import React, { useEffect } from "react"
import SideBar from "@/components/teacher/layout/SideBar/SideBar"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import TransitionWrapper from "@/components/student/layout/TransitionWrapper/TransitionWrapper"
import NavBar from "@/components/student/layout/NavBar/NavBar"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getNationAPI } from "@/api/common/getNationAPI"
import { getNationType } from "@/types/common/apiReturnTypes"
import { nationData } from "@/store/store"
import { useAtom } from "jotai"
import { getCookie } from "@/api/cookie"

type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const router = useRouter()
	const [nationDataAtom, setNationDataAtom] = useAtom(nationData)

	useEffect(() => {
		const accessToken = getCookie("Authorization")
		if (accessToken) {
			getNationAPI().then((res) => {
				if (res) {
					setNationDataAtom(() => res)
				}
			})
		}
	}, [getCookie("Authorization")])

	useEffect(() => {
		if (nationDataAtom) {
			window.localStorage.setItem("currency", nationDataAtom.currency)
			window.localStorage.setItem("nation", nationDataAtom.title)
		}
	}, [nationDataAtom])

	const separator: string = useRouter().pathname.split("/")[1]

	if (separator === "teacher") {
		return (
			<OverlayScrollbarsComponent defer>
				<SideBar>{children}</SideBar>
			</OverlayScrollbarsComponent>
		)
	} else if (separator === "student") {
		return (
			<NavBar>
				<TransitionWrapper>{children}</TransitionWrapper>
			</NavBar>
		)
	} else {
		return (
			<OverlayScrollbarsComponent defer>
				<div>{children}</div>
			</OverlayScrollbarsComponent>
		)
	}
}

export default Layout
