import React from "react"
import SideBar from "@/components/teacher/layout/SideBar/SideBar"
import { useRouter } from "next/router"

type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const separator: string = useRouter().pathname.split("/")[1]

	if (separator === "teacher") {
		return <SideBar>{children}</SideBar>
	} else if (separator === "student") {
		return <div>{children}</div>
	} else {
		return <div>{children}</div>
	}
}

export default Layout
