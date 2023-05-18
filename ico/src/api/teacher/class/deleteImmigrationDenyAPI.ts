import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	immigrationId: number
}

type responseType = {
	status: number
	data: successReturnType
}

export const deleteImmigrationDenyAPI = async ({ immigrationId }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.delete(`/immigration/teacher/${immigrationId}`)

		return response.data
	} catch (error) {
		throw error
	}
}
