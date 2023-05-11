import React, { useEffect } from "react"
import SideBar from "@/components/teacher/layout/SideBar/SideBar"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import TransitionWrapper from "@/components/student/layout/TransitionWrapper/TransitionWrapper"
import NavBar from "@/components/student/layout/NavBar/NavBar"
import { useQuery } from "@tanstack/react-query"
import { getNationAPI } from "@/api/common/getNationAPI"
import { getNationType } from "@/types/common/apiReturnTypes"


type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const router = useRouter()

	const { data, refetch } = useQuery<getNationType>(["common", "nation"], getNationAPI, {
		enabled: false
	})

	useEffect(() => {
		refetch()
	}, [])

	useEffect(() => {
		console.log(data)
	}, [router.pathname])

	// useEffect(() => {
	// 	if (data) {
	// 		localStorage.setData("currency", data.currency)
	// 		localStorage.setData("nation", data.title)
	// 	}
	// }, [data])

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
