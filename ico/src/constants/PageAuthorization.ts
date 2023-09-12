import { layoutTokenStatusType } from "@/types/common/apiReturnTypes";


// [
//   {
//       "id": 1,
//       "name": "CREDIT_SCORE",
//       "detail": "신용 등급 조정 권한"
//   },
//   {
//       "id": 2,
//       "name": "NATIONAL_TAX",
//       "detail": "국세 비율 조정 권한"
//   },
//   {
//       "id": 3,
//       "name": "STATEMENTS",
//       "detail": "학생 간 입출금 관리 권한"
//   },
//   {
//       "id": 4,
//       "name": "FINANCE",
//       "detail": "예금 만기 권한"
//   },
//   {
//       "id": 5,
//       "name": "WAREHOUSEMAN",
//       "detail": "교사 상점 운영 권한 "
//   },
//   {
//       "id": 6,
//       "name": "NEWSPAPER",
//       "detail": "학급 소식 운영 권한"
//   }
// ]

export const AUTH_TARGET_URL: { [prop: string]: { [prop: string]: { url: string; message: string } } } = {
  ADMIN: {
    admin: { url: "/admin/confirm", message: "" },
  },
  GUEST: {
    require_login: { url: "/login", message: "로그인이 필요한 서비스입니다." },
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

export const AUTH_ALLOWED_ONLY: { [prop: string]: layoutTokenStatusType } = {
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
  "/login": { role: ["GUEST"], status: ["require_login"] },
  "/signup": { role: ["GUEST"], status: ["require_login"] },
  "/admin/confirm": { role: ["ADMIN"], status: ["admin"] },
  "/student/signup": { role: ["GUEST"], status: ["require_login"] },
  "/teacher/cert": { role: ["TEACHER"], status: ["require_approval", "require_submit_certification"] },
  "/teacher/signup": { role: ["GUEST"], status: ["require_login"] },
  "/student/enter": { role: ["STUDENT"], status: ["require_submit_code"] },
  "/student/check": { role: ["STUDENT"], status: ["require_refresh_token", "require_approval"] },
  "/teacher/create": { role: ["TEACHER"], status: ["require_create_nation"] },
  "/teacher/password": { role: ["TEACHER"], status: ["require_change_password", "approved"] },
  "/student/password": { role: ["STUDENT"], status: ["require_change_password", "approved"] },
  "/student/job/rule": { role: ["STUDENT"], status: ["6"] },
}