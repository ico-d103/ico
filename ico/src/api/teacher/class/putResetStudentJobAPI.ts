import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	studentId: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const putResetStudentJobAPI = async ({ studentId }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/job/teacher/reset/${studentId}`)

		return response.data
	} catch (error) {
		throw error
	}
}
