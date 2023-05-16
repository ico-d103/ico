import { useEffect } from "react"
import SideBar from "@/components/teacher/layout/SideBar/SideBar"
import { useRouter } from "next/router"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import TransitionWrapper from "@/components/student/layout/TransitionWrapper/TransitionWrapper"
import NavBar from "@/components/student/layout/NavBar/NavBar"
import { getNationAPI } from "@/api/common/getNationAPI"
import { nationData } from "@/store/store"
import { useSetAtom } from "jotai"
import { getCookie } from "@/api/cookie"
import { useQueryClient } from "@tanstack/react-query"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "../StackNotification/NotiTemplate"


type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const noti = useNotification()
	const router = useRouter()
	const pathname = router.pathname
	const queryClient = useQueryClient()
	const setNationDataAtom = useSetAtom(nationData)
	const separator: string = useRouter().pathname.split("/")[1]
	const accessToken = getCookie("Authorization")

	useEffect(() => {
		queryClient.clear()
	}, [])

	// useEffect(() => {
	// 	getTokenStatusAPI()
	// 		.then((res) => {
	// 			if (res.role == "STUDENT") {
	// 				if (res.status == "require_submit_code") {
	// 					router.push("/student/enter")
	// 				}
	// 				if (res.status == "waiting") {
	// 					router.push("/student/check")
	// 				}
	// 				if (res.status == "require_refresh_token") {
	// 					router.push("/student/check")
	// 				}
	// 				if (res.status == "approved") {
	// 					router.push("/student/home")
	// 				}
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err)
	// 		})
	// }, [getTokenStatusAPI])

	useEffect(() => {
		if (accessToken) {
			getNationAPI().then((res) => {
				if (res) {
					setNationDataAtom(() => res)
				}
			})
		}
	}, [accessToken])



	const ROUTES = {
		'/student/login': {role: 'STUDENT', status: 'require_login'},

	}


	// useEffect(() => {
	// 	queryClient.clear()
	// }, [])


	// useEffect(() => {
	// 	getTokenStatusAPI()
	// 		.then((res) => {
	// 			if (res.role == "STUDENT") {
	// 				if (res.status == "require_submit_code") {
	// 					router.push("/student/enter")
	// 				}
	// 				if (res.status == "waiting") {
	// 					router.push("/student/check")
	// 				}
	// 				if (res.status == "require_refresh_token") {
	// 					router.push("/student/check")
	// 				}
	// 				if (res.status == "approved") {
	// 					router.push("/student/home")
	// 				}
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err)
	// 		})
	// }, [getTokenStatusAPI])

	

	// useEffect(() => {
	// 	if (accessToken) {
	// 		getTokenStatusAPI().then((res) => {
	// 			if (res.role === "TEACHER") {
	// 				if (separator === "teacher") {
	// 					if (res.status === "approved") {
	// 						return
	// 					} else if (res.status === "require_create_nation") {
	// 						router.push("/teacher/create")
	// 					} else if (res.status === "waiting") {
	// 						router.push("/teacher/login")
	// 						noti({
	// 							content: <NotiTemplate type={"alert"} content={`교사 인증서 승인 대기중입니다.`} />,
	// 							duration: 3000,
	// 						})
	// 					} else if (res.status === "require_submit_certification") {
	// 						router.push("/teacher/login")
	// 						noti({
	// 							content: <NotiTemplate type={"alert"} content={`교사 인증에 실패하였습니다.`} />,
	// 							duration: 3000,
	// 						})
	// 					}
	// 				} else if (separator === "student" || separator === "admin") {
	// 					router.push("/")
	// 					noti({
	// 						content: <NotiTemplate type={"alert"} content={`잘못된 접근입니다.`} />,
	// 						duration: 3000,
	// 					})
	// 				}
	// 			} else if (res.role === "STUDENT") {
	// 				if (separator === "student") {
	// 					if (res.status == "require_submit_code") {
	// 						router.push("/student/enter")
	// 					} else if (res.status == "waiting") {
	// 						router.push("/student/check")
	// 					} else if (res.status == "require_refresh_token") {
	// 						router.push("/student/check")
	// 					} else if (res.status == "approved") {
	// 						// router.push("/student/home")
	// 						return
	// 					}
	// 				} else if (separator === "teacher" || separator === "admin") {
	// 					router.push("/")
	// 					noti({
	// 						content: <NotiTemplate type={"alert"} content={`잘못된 접근입니다.`} />,
	// 						duration: 3000,
	// 					})
	// 				}
	// 			} else if (res.role === "ADMIN") {
	// 				router.push("/admin")
	// 			}
	// 		})
	// 	}
	// }, [pathname])

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
