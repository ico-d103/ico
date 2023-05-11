import { defaultInstance, tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {

}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteFinanceInvestAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/invest/student`)
		return response.data
	} catch (error) {
		throw error
	}
}
