import { defaultInstance, tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: { price: number; amount: number }
}

type responseType = {
	status: number
	data: successReturnType
}

export const postFinanceInvestAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/invest/student`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
