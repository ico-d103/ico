import { defaultInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		"school" : string
		"grade" : number
		"room" : number
		"title" : string
		"currency" : string
	}
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postCreateNationAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await defaultInstance.post("/nation/teacher", body)

		if (response.status === 200) return response.data
	} catch (error) {
		throw error
	}
}
