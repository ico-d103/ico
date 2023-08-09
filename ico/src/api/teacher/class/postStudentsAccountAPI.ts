import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		title: string
		amount: string
		studentIds: number[]
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postStudentsAccountAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/student/teacher/account`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
