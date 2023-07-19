import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		subject: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postLicenseAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/license/teacher`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
