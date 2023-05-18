import { defaultInstance, tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: { longPeriod: boolean; amount: number }
}

type responseType = {
	status: number
	data: successReturnType
}

export const postFinanceDepositAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/deposit/student`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
