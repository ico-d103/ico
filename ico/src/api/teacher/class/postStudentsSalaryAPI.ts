import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: { studentIds: number[] }
}

type responseType = {
	status: number
	data: successReturnType
}

export const postStudentsSalaryAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/payment/teacher/salary`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
