import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: number
    resumeId: string
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteResumeApplyAPI = async ({ id,resumeId }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/resume/student/${id}/${resumeId}`)
		return response.data
	} catch (error) {
		throw error
	}
}
