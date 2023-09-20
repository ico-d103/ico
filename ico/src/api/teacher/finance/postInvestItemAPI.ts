import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		title: string
		content: string
		amount: number
		issue: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postInvestItemAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/stock/teacher", body)
		return response.data
	} catch (error) {
		throw error
	}
}
