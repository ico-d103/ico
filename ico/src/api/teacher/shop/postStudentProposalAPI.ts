import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	pid: number
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postStudentProposalAPI = async ({ pid }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`student-product/teacher/${pid}`)
		return response.data
	} catch (error) {
		throw error
	}
}
