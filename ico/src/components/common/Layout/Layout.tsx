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
import useGetTokenStatus from "@/hooks/useGetTokenStatus"

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
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()

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

	useEffect(() => {
		setTokenStatus({ showMessage: true })
	}, [])

	const TARGET_URL: { [prop: string]: { [prop: string]: { url: string; message: string } } } = {
		ADMIN: {
			admin: { url: "/admin/confirm", message: "" },
		},
		GUEST: {
			require_login: { url: "/", message: "로그인이 필요한 서비스입니다." },
		},
		STUDENT: {
			require_submit_code: { url: "/student/enter", message: "반 코드를 입력해 주세요!" },
			require_refresh_token: { url: "/student/check", message: "입국 심사를 기다리고 있어요!" },
			require_approval: { url: "/student/check", message: "입국 심사를 기다리고 있어요!" },
			require_change_password: { url: "/student/password", message: "비밀번호를 변경해 주세요!" },
			approved: { url: "/student/home", message: "잘못된 요청입니다." },
		},
		TEACHER: {
			require_approval: { url: "/teacher/cert", message: "교사 인증서 승인 대기중입니다." },
			require_create_nation: { url: "/teacher/create", message: "국가를 생성하는 페이지로 이동합니다." },
			require_submit_certification: { url: "/teacher/cert", message: "교사 인증서를 다시 제출해야 합니다." },
			require_change_password: { url: "/student/password", message: "비밀번호를 변경해 주세요!" },
			approved: { url: "/teacher/class/students", message: "잘못된 요청입니다." },
		},
	}

	const ROUTES: { [prop: string]: layoutTokenStatusType } = {
		"/404": {
			role: ["GUEST", "TEACHER", "STUDENT"],
			status: [
				"require_login",
				"require_submit_code",
				"require_refresh_token",
				"require_submit_certification",
				"require_create_nation",
				"require_approval",
				"approved",
			],
		},
		"/": { role: ["GUEST"], status: ["require_login"] },
		"/admin/login": { role: ["GUEST"], status: ["require_login"] },
		"/admin/confirm": { role: ["ADMIN"], status: ["admin"] },
		"/student/login": { role: ["GUEST"], status: ["require_login"] },
		"/student/signup": { role: ["GUEST"], status: ["require_login"] },
		"/teacher/login": { role: ["GUEST"], status: ["require_login"] },
		"/teacher/cert": { role: ["TEACHER"], status: ["require_approval", "require_submit_certification"] },
		"/teacher/signup": { role: ["GUEST"], status: ["require_login"] },
		"/student/enter": { role: ["STUDENT"], status: ["require_submit_code"] },
		"/student/check": { role: ["STUDENT"], status: ["require_refresh_token", "require_approval"] },
		"/teacher/create": { role: ["TEACHER"], status: ["require_create_nation"] },
		"/teacher/password": { role: ["TEACHER"], status: ["require_change_password", "approved"] },
		"/student/password": { role: ["STUDENT"], status: ["require_change_password", "approved"] },
	}

	useEffect(() => {
		if (tokenStatusAtom.role !== null && tokenStatusAtom.status !== null) {
			const isValidRequest =
				ROUTES[router.pathname]?.role.includes(tokenStatusAtom.role) &&
				ROUTES[router.pathname]?.status.includes(tokenStatusAtom.status)
			const allowByStatus =
				tokenStatusAtom.status === "approved" &&
				(Object.keys(ROUTES).includes(router.pathname) ? ROUTES[router.pathname]?.status.includes("approved") : true)
			const allowByRole =
				router.pathname === "/" ||
				(tokenStatusAtom.role === "STUDENT" && separator === "student") ||
				(tokenStatusAtom.role === "TEACHER" && separator === "teacher")

			if (isValidRequest || (allowByRole && allowByStatus)) {
				setIsValidChecked(() => true)
			} else {
				console.log("접근!")
				if (tokenStatusAtom.showMessage === true) {
					noti({
						content: (
							<NotiTemplate
								type={"alert"}
								content={`${TARGET_URL[tokenStatusAtom.role][tokenStatusAtom.status].message}`}
							/>
						),
						duration: 5000,
					})
				}
				router.push(TARGET_URL[tokenStatusAtom.role][tokenStatusAtom.status].url)
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
		return <PageLoading />
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
