import { tokenInstance } from "@/api/instance"
import { depositProductType } from "@/types/teacher/apiReturnTypes"

type responseType = {
	status: number
	data: depositProductType[]
}

export const getDepositListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/deposit-product/teacher/all")

		return response.data
	} catch (error) {
		throw error
	}
}
