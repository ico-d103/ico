import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		school: string
		grade: number
		room: number
		title: string
		currency: string
	}
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postCreateNationAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/nation/teacher", body)
		return response.data
	} catch (error) {
		throw error
	}
}
