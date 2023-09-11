import { defaultInstance, tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	pid: number
	mid: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteFinanceInvestAPI = async ({pid, mid}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/invest/student/${pid}/${mid}`)
		return response.data
	} catch (error) {
		throw error
	}
}
