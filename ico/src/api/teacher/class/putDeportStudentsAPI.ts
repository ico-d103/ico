import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: { studentIds: number[] }
}

type responseType = {
	status: number
	data: successReturnType
}

export const putDeportStudentsAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/student/teacher/exile`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
