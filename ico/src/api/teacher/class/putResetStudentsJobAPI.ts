import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: number[]
}

type responseType = {
	status: number
	data: successReturnType
}

export const putResetStudentsJobAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/job/teacher/reset`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
