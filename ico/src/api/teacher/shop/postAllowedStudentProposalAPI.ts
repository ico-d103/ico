import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	pid: string
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postAllowedStudentProposalAPI = async ({ pid }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`student-product/teacher/${pid}`)
		return response.data
	} catch (error) {
		throw error
	}
}
