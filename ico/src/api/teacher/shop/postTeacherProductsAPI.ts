import { formDataTokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: FormData
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postTeacherProductsAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await formDataTokenInstance.post("/teacher-product", body)
		return response.data
	} catch (error) {
		throw error
	}
}
