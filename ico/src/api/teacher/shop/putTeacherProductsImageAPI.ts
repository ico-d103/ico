import { formDataTokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
  id: number
	body: FormData
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const putTeacherProductsImageAPI = async ({ id, body }: paramsType) => {
	try {
		const response: responseType = await formDataTokenInstance.put(`/teacher-product/${id}/image`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
