import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	id: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteImmigrationDenyAPI = async ({ id }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/immigration/teacher/${id}`)

		return response.data
	} catch (error) {
		throw error
	}
}
