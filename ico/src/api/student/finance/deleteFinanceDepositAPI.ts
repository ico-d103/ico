import { defaultInstance, tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {

}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteFinanceDepositAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/deposit/student`)
		return response.data
	} catch (error) {
		throw error
	}
}
