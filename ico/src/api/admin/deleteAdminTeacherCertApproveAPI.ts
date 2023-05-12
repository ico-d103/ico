import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	idx: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteAdminTeacherCertApproveAPI = async ({ idx }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`certification/admin/approve/${idx}`)

		return response.data
	} catch (error) {
		throw error
	}
}
