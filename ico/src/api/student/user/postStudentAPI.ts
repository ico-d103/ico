import { defaultInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		name: string
		identity: string
		password: string
		checkedPassword: string
	}
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postStudentAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await defaultInstance.post("/student", body)

		if (response.status === 200) return response.data
	} catch (error) {
		throw error
	}
}
