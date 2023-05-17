import { formDataTokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

// 학생이 판매 제안서 등록
type paramsType = {
	body: FormData
}
type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postStudentProductsAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await formDataTokenInstance.post("/student-product/student/proposal", body)
		return response.data
	} catch (error) {
		throw error
	}
}
