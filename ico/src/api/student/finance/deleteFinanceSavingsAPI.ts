import { defaultInstance, tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: string
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteFinanceSavingsAPI = async ({id}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/saving/student/${id}`)
		return response.data
	} catch (error) {
		throw error
	}
}
