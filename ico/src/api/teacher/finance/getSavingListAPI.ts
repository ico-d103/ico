import { tokenInstance } from "@/api/instance"
import { savingListType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: savingListType[]
}

export const getSavingListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/saving-product/teacher/all")

		return response.data
	} catch (error) {
		throw error
	}
}
