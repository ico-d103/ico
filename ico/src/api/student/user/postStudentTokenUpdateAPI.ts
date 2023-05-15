import { defaultInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postStudentTokenUpdateAPI = async () => {
	try {
		const response: responseType = await defaultInstance.post("/token")

		if (response.status === 200) return response.data
	} catch (error) {
		throw error
	}
}
