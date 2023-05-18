import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
        id: number
        unixTime: number
    }
}
type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postPurchaseStudentProductsAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/student-product/student/buy", body)
		return response.data
	} catch (error) {
        console.log(error)
		throw error
	}
}
