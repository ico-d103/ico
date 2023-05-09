import { defaultInstance } from "@/api/instance"
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
		const response: responseType = await defaultInstance.post("/immigration/student", body)
		if (response.status === 200) return response.data
	} catch (error) {
		throw error
	}
}
