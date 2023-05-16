import { useEffect, useState } from "react"
import SideBar from "@/components/teacher/layout/SideBar/SideBar"
import { useRouter } from "next/router"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import TransitionWrapper from "@/components/student/layout/TransitionWrapper/TransitionWrapper"
import NavBar from "@/components/student/layout/NavBar/NavBar"
import { getNationAPI } from "@/api/common/getNationAPI"
import { nationData, tokenStatus } from "@/store/store"
import { useSetAtom, useAtom } from "jotai"
import { getCookie } from "@/api/cookie"
import { useQueryClient } from "@tanstack/react-query"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "../StackNotification/NotiTemplate"
import {
	getTokenStatusType,
	layoutTokenStatusType,
	tokenRoleIndividual,
	tokenStatusIndividual,
} from "@/types/common/apiReturnTypes"
import PageLoading from "@/components/student/layout/PageLoading/PageLoading"

type LayoutProps = {
	children: any
}

function Layout({ children }: LayoutProps) {
	const noti = useNotification()
	const router = useRouter()
	const pathname = router.pathname
	const queryClient = useQueryClient()
	const setNationDataAtom = useSetAtom(nationData)
	const [tokenStatusAtom, setTokenStatusAtom] = useAtom(tokenStatus)
	const separator: string = useRouter().pathname.split("/")[1]
	const accessToken = getCookie("Authorization")
	const [isValidChecked, setIsValidChecked] = useState<boolean>(false)

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

		getTokenStatusAPI()
			.then((res) => {
				if (res) {
					setTokenStatusAtom(() => res)
				}
			})
			.catch((error) => {
				setTokenStatusAtom(() => {
					return {
						status: "require_login",
						role: "GUEST",
					}
				})
			})
	}, [accessToken])






	const TARGET_URL: { [prop: string]: { [prop: string]: string } } = {
		GUEST: {
			require_login: "/",
		},
		STUDENT: {
			require_submit_code: "/student/enter",
			require_refresh_token: "/student/check",
			waiting: "/student/check",
			approved: "/student/home",
		},
		TEACHER: {
			waiting: "/teacher/login",
			require_create_nation: "/teacher/create",
			approved: "/teacher/class/students",
			require_submit_certification: "/teacher/login",
		},
	}


	const ROUTES: { [prop: string]: layoutTokenStatusType } = {
		"/": {role: ["GUEST", "TEACHER", "STUDENT"], status: ["require_login", "require_submit_code", "require_refresh_token", "require_submit_certification", "require_create_nation", "waiting", "approved",]},
		"/student/login": { role: ["GUEST"], status: ["require_login"] },
		"/student/signup": { role: ["GUEST"], status: ["require_login"] },
		"/teacher/login": {role: ["GUEST", "TEACHER"], status: ["require_login", "waiting", "require_submit_certification"],}, // 교사 로그인 role에 TEACHER가 있는 이유는 교사 승인을 기다리고 있는 경우, require_submit_certification는 교사 승인 제출폼이 따로 생기기 전까지 임시로 사용
		"/student/enter": { role: ["STUDENT"], status: ["require_submit_code"] },
		"/student/check": { role: ["STUDENT"], status: ["require_refresh_token", "waiting"] },
		"/teacher/create": { role: ["TEACHER"], status: ["require_create_nation"] },
		// "/student/home": { role: ["STUDENT"], status: ["approved"] },
		// "/teacher/class/students": { role: ["TEACHER"], status: ["approved"] },
		// '/teacher/승인서제출폼': {role: ['GUEST'], status: 'require_submit_certification'},
	}





	useEffect(() => {
		if (tokenStatusAtom.role !== null && tokenStatusAtom.status !== null) {
			
			const isRoleMatch = ROUTES[router.pathname]?.role.includes(tokenStatusAtom.role)
			const isStatusMatch = ROUTES[router.pathname]?.status.includes(tokenStatusAtom.status)

			if ((ROUTES[router.pathname]?.role) && (!isRoleMatch || !isStatusMatch)) {
				noti({
					content: (
						<NotiTemplate
							type={"alert"}
							content={`잘못된 접근입니다.`}
						/>
					),
					duration: 5000,
				})
				router.push(TARGET_URL[tokenStatusAtom.role][tokenStatusAtom.status])
				
			} else {

				if (tokenStatusAtom.role === "STUDENT" && separator === 'student' || tokenStatusAtom.role === "TEACHER" && separator === 'TEACHER' ) {
					setIsValidChecked(() => true)
				} else {
					noti({
						content: (
							<NotiTemplate
								type={"alert"}
								content={`잘못된 접근입니다. ${JSON.stringify(tokenStatusAtom)}, ${isRoleMatch}, ${isStatusMatch}`}
							/>
						),
						duration: 5000,
					})
					router.push(TARGET_URL[tokenStatusAtom.role][tokenStatusAtom.status])
				}
				
			}
		} 
	}, [tokenStatusAtom, router.pathname])




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
	if (!isValidChecked) {
		return <PageLoading/>
	} else if (separator === "teacher") {
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
