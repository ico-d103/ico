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

defaultInstance.interceptors.response.use(
	(config) => config,
	async (error) => {
		if (error.response.data.code === "29") {
			await removeCookie("Authorization")
		}
		return await Promise.reject(error)
	}
)

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
	async (error) => Promise.reject(error)
)

tokenInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.log("Fewfwefe", error.response.data.code)
		if (error.response.data.code === "29") {
			await removeCookie("Authorization")
		}
		return await Promise.reject(error)
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
