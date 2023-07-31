import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"
import { studentLicenseBodyType } from "@/types/teacher/apiReturnTypes"

type paramsType = {
	body: {
		studentIds: number[]
		license: { [key: number]: number }[]
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const putStudentsLicenseAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/license/teacher`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
