import { defaultInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type bodyType = {
	body: {
		password: string
		checkedPassword: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const putChangePasswordAPI = async ({ body }: bodyType) => {
	try {
		const response: responseType = await defaultInstance.put("/change-pw", body)

		return response.data
	} catch (error) {
		throw error
	}
}
