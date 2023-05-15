import { useEffect } from "react"
import SideBar from "@/components/teacher/layout/SideBar/SideBar"
import { useRouter } from "next/router"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import TransitionWrapper from "@/components/student/layout/TransitionWrapper/TransitionWrapper"
import NavBar from "@/components/student/layout/NavBar/NavBar"
import { getNationAPI } from "@/api/common/getNationAPI"
import { nationData } from "@/store/store"
import { useAtom } from "jotai"
import { getCookie } from "@/api/cookie"
import { useQueryClient } from "@tanstack/react-query"

type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const [nationDataAtom, setNationDataAtom] = useAtom(nationData)
	const queryClient = useQueryClient()

	useEffect(() => {
		queryClient.clear()
	}, [])

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
