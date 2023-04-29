import React from "react"
import SideBar from "@/components/teacher/layout/SideBar/SideBar"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import TransitionWrapper from "@/components/student/layout/TransitionWrapper/TransitionWrapper"

type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const separator: string = useRouter().pathname.split("/")[1]






	if (separator === "teacher") {
		return <SideBar>{children}</SideBar>
	} else if (separator === "student") {
		return <TransitionWrapper>{children}</TransitionWrapper>
	} else {
		return <div>{children}</div>
	}
}

export default Layout
