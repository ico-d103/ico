import { defaultInstance, tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const postFinanceSavingAPI = async ({id}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/saving/student/${id}`)
		return response.data
	} catch (error) {
		throw error
	}
}
