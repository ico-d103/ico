import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
}
type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const deleteImmigrationAPI = async ({}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete("/immigration/student")
		return response.data
	} catch (error) {
		throw error
	}
}
