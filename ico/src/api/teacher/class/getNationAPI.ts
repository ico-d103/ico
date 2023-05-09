import { tokenInstance } from "@/api/instance"
import { getNationType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: getNationType
}

export const getNationAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/nation/teacher")

		return response.data
	} catch (error) {
		throw error
	}
}
