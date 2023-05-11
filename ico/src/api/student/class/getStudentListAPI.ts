import { tokenInstance } from "@/api/instance"
import { getStudentListType } from "@/types/student/apiReturnTypes"

type responseType = {
	status: number
	data: getStudentListType[]
}

export const getStudentListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/student/student")

		return response.data
	} catch (error) {
		throw error
	}
}
