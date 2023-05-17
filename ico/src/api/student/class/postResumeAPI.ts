import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const postResumeAPI = async ({ id }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/resume/student/${id}`)
		return response.data
	} catch (error) {
		console.log(error)
		throw error
	}
}
