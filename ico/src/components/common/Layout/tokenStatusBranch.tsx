import { useRouter } from "next/router"

export default function tokenStatusBranch(role: string, status: string) {
	const router = useRouter()

	// 교사 분기 처리
	if (role === "TEACHER") {
		switch (status) {
			case "approved":
				// 해당 페이지에 머무르기
				// 로그인 페이지
				return
			case "require_create_nation":
				// 나라 생성 페이지로 이동
				return router.push("/teacher/create")
			case "waiting":
				// 인증대기 모달 띄우기
				return
			case "require_submit_certification":
				// 교사 수정 페이지 이동
				return
			case "class/students":
				console.log("들어오나")
				// test
				return "/teacher/class/property"
			default:
				return
		}
	}
	// 학생 분기 처리
	else if (role === "STUDENT") {
		switch (status) {
			case "require_submit_code":
				return
			case "waiting":
				return
			case "approved":
				return
			case "require_refresh_token":
				return
			default:
				return
		}
	}
	// 관리자 분기 처리
	else if (role === "ADMIN") {
		switch (status) {
			case "admin":
				return
			default:
				return
		}
	}

	return
}
