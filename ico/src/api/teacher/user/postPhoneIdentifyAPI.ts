import { defaultInstance } from "@/api/instance"
import { errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		phoneNum: string
	}
}

type responseType = {
	status: number
	data: string
}

export const postPhoneIdentifyAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await defaultInstance.post("/teacher/phone", body)

		return response.data
	} catch (error) {
		throw error
	}
}
