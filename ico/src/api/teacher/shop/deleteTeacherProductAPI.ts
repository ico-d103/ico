import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	pid: string
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const deleteTeacherProductAPI = async ({ pid }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`teacher-product/teacher/${pid}`)
		return response.data
	} catch (error) {
		throw error
	}
}
