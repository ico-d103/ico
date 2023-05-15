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
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"

type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const [nationDataAtom, setNationDataAtom] = useAtom(nationData)
	const queryClient = useQueryClient()

	const router = useRouter()

	useEffect(() => {
		queryClient.clear()
	}, [])

	
	useEffect(() => {
		getTokenStatusAPI()
			.then((res) => {
				if (res.role == "STUDENT") {
					if (res.status == "require_submit_code") {
						router.push("/student/enter")
					}
					if (res.status == "waiting") {
						router.push("/student/check")
					}
					if (res.status == "require_refresh_token") {
						router.push("/student/check")
					}
					if (res.status == "approved") {
						router.push("/student/home")
					}
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}, [getTokenStatusAPI])

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
