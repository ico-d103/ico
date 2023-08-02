import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		studentIds: number[]
		type: boolean
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postCreditScoreAllAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/student/teacher/credit-score`, body)

		return response.data
	} catch (error) {
		throw error
	}
}