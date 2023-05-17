import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		title: string
		source: string
		amount: number
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postTreasuryAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/treasury-history/teacher`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
