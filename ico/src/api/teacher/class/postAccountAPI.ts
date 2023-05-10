import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	studentId: number
	body: {
		title: string
		amount: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postAccountAPI = async ({ studentId, body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/student/teacher/${studentId}/account`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
