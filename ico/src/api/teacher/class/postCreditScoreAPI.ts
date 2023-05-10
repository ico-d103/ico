import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	studentId: number
	body: {
		type: boolean
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postCreditScoreAPI = async ({ studentId, body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/student/teacher/${studentId}/credit-score`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
