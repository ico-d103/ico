import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	idx: number
	body: {
		title: string
		content: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const putInvestItemAPI = async ({ idx, body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/stock/teacher/${idx}`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
