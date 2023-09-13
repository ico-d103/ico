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
import { AUTH_ALLOWED_ONLY, AUTH_TARGET_URL } from "@/constants/PageAuthorization"
import { css } from "@emotion/react"

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
		setTokenStatus({ showMessage: false })
	}, [])

	useEffect(() => {
		if (tokenStatusAtom.role !== null && tokenStatusAtom.status !== null) {
			// statusArr - 권한을 가진 학생으로 인해 상태를 배열로 변환
			// const statusArr = tokenStatusAtom.status.split(",")
			const passedStatus = tokenStatusAtom.status.filter((it: string) => AUTH_ALLOWED_ONLY[router.pathname]?.status.includes(it)).length && true


			const isValidRequest =
				AUTH_ALLOWED_ONLY[router.pathname]?.role.includes(tokenStatusAtom.role) &&
				passedStatus
				// AUTH_ALLOWED_ONLY[router.pathname]?.status.includes(tokenStatusAtom.status)
			// const allowByStatus =
			// 	tokenStatusAtom.status === "approved" &&
			// 	(Object.keys(AUTH_ALLOWED_ONLY).includes(router.pathname)
			// 		? AUTH_ALLOWED_ONLY[router.pathname]?.status.includes("approved")
			// 		: true)
			const allowByStatus =
			tokenStatusAtom.status.includes("approved") &&
			(Object.keys(AUTH_ALLOWED_ONLY).includes(router.pathname)
				? AUTH_ALLOWED_ONLY[router.pathname]?.status.includes("approved")
				: true)

			const allowByRole =
				router.pathname === "/" ||
				(tokenStatusAtom.role === "STUDENT" && separator === "student") ||
				(tokenStatusAtom.role === "TEACHER" && separator === "teacher")

			if (isValidRequest || (allowByRole && allowByStatus)) {
				setIsValidChecked(() => true)
			} else {
				// console.log("접근!")
				// if (tokenStatusAtom.showMessage === true) {
				// 	noti({
				// 		content: (
				// 			<NotiTemplate
				// 				type={"alert"}
				// 				content={`${AUTH_TARGET_URL[tokenStatusAtom.role][tokenStatusAtom.status].message}`}
				// 			/>
				// 		),
				// 		duration: 5000,
				// 	})
				// }
				// router.push(AUTH_TARGET_URL[tokenStatusAtom.role][tokenStatusAtom.status].url)
				router.push(AUTH_TARGET_URL[tokenStatusAtom.role][tokenStatusAtom.status[0]].url)
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
			<OverlayScrollbarsComponent css={css`min-height: 100%;`} defer>
				{children}
			</OverlayScrollbarsComponent>
		)
	}
}

export default Layout
