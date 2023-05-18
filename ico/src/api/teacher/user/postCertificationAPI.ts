import { formDataInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: FormData
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postCertificationAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await formDataInstance.post("/teacher/image", body)

		return response.data
	} catch (error) {
		console.log(error)
		throw error
	}
}
