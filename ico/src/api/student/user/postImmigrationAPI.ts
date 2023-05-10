import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		code: string
	}
}
type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postImmigrationAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/immigration/student", body)
		return response.data
	} catch (error) {
		throw error
	}
}
