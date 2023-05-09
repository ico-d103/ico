import { tokenInstance } from "@/api/instance"
import { getStudentListType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: getStudentListType
}

export const getStudentListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/student/teacher")
		console.log("getStudentListAPI response : ", response)

		// if (response.status === 200) return response.data
	} catch (error) {
		throw error
	}
}
