import { tokenInstance } from "@/api/instance"
import { getNationType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: getNationType
}

export const getNationAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/nation")

		return response.data
	} catch (error) {
		throw error
	}
}
