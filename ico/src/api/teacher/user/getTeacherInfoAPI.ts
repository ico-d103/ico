


import { tokenInstance } from "@/api/instance"
import { getTeacherInfoType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: getTeacherInfoType
}

export const getTeacherInfoAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/teacher/teacher")
		return response.data
	} catch (error) {
		throw error
	}
}
