import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
        products: {id: number; count: number}[]
        unixTime: number
    }
}
type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postPurchaseStudentProductsAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/teacher-product/student/product", body)
		return response.data
	} catch (error) {
		throw error
	}
}
