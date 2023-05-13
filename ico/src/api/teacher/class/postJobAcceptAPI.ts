import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: string
}

type responseType = {
	status: number
	data: successReturnType
}

export const postJobAcceptAPI = async ({ id }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/resume/teacher/${id}`)

		return response.data
	} catch (error) {
		throw error
	}
}
