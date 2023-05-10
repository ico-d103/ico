import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	studentId: number
	bodyType: {
		title: string
		amount: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postAccountAPI = async ({ studentId, bodyType }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/student/teacher/${studentId}/account`, bodyType)

		return response.data
	} catch (error) {
		throw error
	}
}
