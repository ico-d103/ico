import axios from "axios"

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {},
})

export default instance
