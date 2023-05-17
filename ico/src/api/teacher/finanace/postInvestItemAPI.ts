import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		amount: number
		content: string
		price: number
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postInvestItemAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/stock/teacher/upload", body)
		return response.data
	} catch (error) {
		throw error
	}
}
