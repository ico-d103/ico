import { formDataInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: FormData
}
type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postStudentProductsAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await formDataInstance.post("/student-product/student/proposal", body)
		return response.data
	} catch (error) {
		throw error
	}
}
