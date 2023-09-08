import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		title: string
		detail: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postGovRuleAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/news`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
