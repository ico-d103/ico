import { defaultInstance, tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: number
	body: { price: number; amount: number }
}

type responseType = {
	status: number
	data: successReturnType
}

export const putFinanceInvestAPI = async ({ id, body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/invest/student/${id}`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
