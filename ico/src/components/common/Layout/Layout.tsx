import { useEffect } from "react"
import SideBar from "@/components/teacher/layout/SideBar/SideBar"
import { useRouter } from "next/router"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import TransitionWrapper from "@/components/student/layout/TransitionWrapper/TransitionWrapper"
import NavBar from "@/components/student/layout/NavBar/NavBar"
import { getNationAPI } from "@/api/common/getNationAPI"
import { nationData, loginRole } from "@/store/store"
import { useAtom } from "jotai"
import { getCookie } from "@/api/cookie"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import tokenStatusBranch from "./tokenStatusBranch"

type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const router = useRouter()
	const [nationDataAtom, setNationDataAtom] = useAtom(nationData)
	const [loginRoleAtom, setLoginRoleAtom] = useAtom(loginRole)

	useEffect(() => {
		const accessToken = getCookie("Authorization")

		if (accessToken) {
			// 나라 정보 저장
			getNationAPI().then((res) => {
				if (res) {
					setNationDataAtom(() => res)
				}
			})

			// 토큰 상태 저장
			getTokenStatusAPI()
				.then((res) => {
					setLoginRoleAtom(res.role)
					// tokenStatusBranch(res.role, res.status)
				})
				.catch((error) => {
					console.log(error)
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
