import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	studentId: number
}

type responseType = {
	status: number
	data: string
}

export const putResetStudentPWAPI = async ({ studentId }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/teacher/teacher/${studentId}`)

		return response.data
	} catch (error) {
		throw error
	}
}
