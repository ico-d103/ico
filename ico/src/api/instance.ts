import axios from "axios"
import { getCookie, removeCookie } from "./cookie"

/**
 * 인증이 필요 없는 기본 요청
 */
export const defaultInstance = axios.create({
	baseURL: "/api",
	withCredentials: false,
})

/**
 * 인증이 필요한 기본 요청
 */
export const tokenInstance = axios.create({
	baseURL: "/api",
})

/**
 * tokenInstance 인터셉터 처리
 */
tokenInstance.interceptors.request.use(
	(config) => {
		// 1. 쿠키 값에서 accesstoken 가져오기
		const accessToken = getCookie("Authorization")

		// 2. accesstoken 있다면 쿠키 값 포함한 채로 http 요청
		if (accessToken) config.headers["Authorization"] = `${accessToken}`

		return config
	},
	(error) => Promise.reject(error),
)

tokenInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		// // accesstoken 만료 시
		// if (error.response.status === 401) {
		// 	// 1. refreshtoken으로 accesstoken 갱신하는 http 요청
		// 	const response = ""

		// 	// 2. 갱신된 accesstoken을 받으면
		// 	if (response) {
		// 		// 2-1. 자동으로 쿠키의 token 갱신

		// 		// 2-2. 원래 하려던 http 요청 수행
		// 		const originalResponse = await tokenInstance.request(error.config)
		// 		return originalResponse
		// 	}
		// 	// 3. refreshtoken도 만료됐다면
		// 	else {
		// 		// 3-1. 로그인 페이지로 이동
		// 	}
		// }




		throw error
	},
)

// ----------------------------------------------------------------------------------------

/**
 * 인증이 필요 없는 formData 요청
 */
export const formDataInstance = axios.create({
	baseURL: "/api",
	withCredentials: false,
})

/**
 * 인증이 필요한 formData 요청
 */
export const formDataTokenInstance = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "multipart/form-data",
	},
})

/**
 * formDataTokenInstance 인터셉터 처리
 */
formDataTokenInstance.interceptors.request.use(
	(config) => {
		const accessToken = getCookie("Authorization")
		if (accessToken) config.headers["Authorization"] = `${accessToken}`
		return config
	},
	(error) => Promise.reject(error),
)

formDataTokenInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response.status === 401) {
			const response = ""
			if (response) {
				const originalResponse = await formDataInstance.request(error.config)
				return originalResponse
			} else {
			}
		}
		throw error
	},
)
