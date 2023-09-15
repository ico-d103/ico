import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	idx: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteSavingItemAPI = async ({ idx }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/saving-product/teacher/${idx}`)
		return response.data
	} catch (error) {
		throw error
	}
}
