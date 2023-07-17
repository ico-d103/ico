import { defaultInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type bodyType = {

}

type responseType = {
	status: number
	data: successReturnType
}

export const putSkipChangePasswordAPI = async ({}: bodyType) => {
	try {
		const response: responseType = await defaultInstance.put("/not-change-pw")

		return response.data
	} catch (error) {
		throw error
	}
}
