import { tokenInstance } from "@/api/instance"
import { getPurchasedTransactionType } from "@/types/student/apiReturnTypes"


type paramsType = {
	idx: number
}
type responseType = {
	status: number
	data: getPurchasedTransactionType
}

export const getPurchasedTeacherTransactionAPI = async ({idx}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`teacher-product/student/transaction/${idx}`)

		return response.data
	} catch (error) {
		throw error
	}
}
