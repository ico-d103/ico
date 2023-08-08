import { tokenInstance } from "@/api/instance"

type responseType = {
	status: number
	data: number
}

export const getMyGradeAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/student/student/credit-rating")

		return response.data
	} catch (error) {
		throw error
	}
}
