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

export const postRentalTeacherProductsAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/teacher-product/student/rental", body)
		return response.data
	} catch (error) {
        console.log(error)
		throw error
	}
}
