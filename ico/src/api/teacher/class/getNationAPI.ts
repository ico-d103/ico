import { tokenInstance } from "@/api/instance"
import { getNationType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: getNationType
}

export const getNationAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/nation/teacher")
		console.log("교사가 생성한 나라 요청 response : ", response)

		// if (response.status === 200) return response.data
	} catch (error) {
		console.log("@@@", error)
		throw error
	}
}
