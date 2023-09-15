import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		title: string
		count: number
		amount: number
		interest: number[]
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postSavingItemAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/saving-product/teacher", body)
		return response.data
	} catch (error) {
		throw error
	}
}
