import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	studentId: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const putStudentLicenseAPI = async ({ studentId }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/license/teacher/detail/${studentId}`)

		return response.data
	} catch (error) {
		throw error
	}
}
