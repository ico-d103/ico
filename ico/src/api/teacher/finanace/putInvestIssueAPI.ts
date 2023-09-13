import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	idx: number
	body: {
		content: string
		price: number
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const putInvestIssueAPI = async ({ idx, body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/issue/teacher/upload/${idx}`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
