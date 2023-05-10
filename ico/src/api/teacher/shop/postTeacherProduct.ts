import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		title: string
		amount: number
		image: string
		detail: string
		count: number
		type: string
	}
}
type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postTeacherProduct = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/immigration/student", body)
		return response.data
	} catch (error) {
		throw error
	}
}
