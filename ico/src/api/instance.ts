import axios from "axios"
import { getCookie } from "./cookie"

/**
 * 인증이 필요 없는 기본 요청
 */
export const defaultInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	withCredentials: false,
})

/**
 * 인증이 필요한 요청
 */
export const tokenInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

/* 인터셉터 처리 */
tokenInstance.interceptors.request.use(
	(config) => {
		// 1. 쿠키 값에서 accesstoken 가져오기
		const accessToken = getCookie("accessToken")

		// 2. accesstoken 있다면 쿠키 값 포함한 채로 http 요청
		if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`

		return config
	},
	(error) => Promise.reject(error),
)

tokenInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		// accesstoken 만료 시
		if (error.response.status === 401) {
			// 1. refreshtoken으로 accesstoken 갱신하는 http 요청
			const response = ""

			// 2. 갱신된 accesstoken을 받으면
			if (response) {
				// 2-1. 자동으로 쿠키의 token 갱신

				// 2-2. 원래 하려던 http 요청 수행
				const originalResponse = await tokenInstance.request(error.config)
				return originalResponse
			}
			// 3. refreshtoken도 만료됐다면
			else {
				// 3-1. 로그인 페이지로 이동
			}
		}
	},
)
