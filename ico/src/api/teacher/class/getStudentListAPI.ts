import { tokenInstance } from "@/api/instance"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: getStudentListType[]
}

export const getStudentListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/student/teacher")
		console.log(response.data)
		return response.data
	} catch (error) {
		throw error
	}
}
