import { tokenInstance } from "@/api/instance"
import { getPurchasedTransactionType } from "@/types/student/apiReturnTypes"


type paramsType = {
	idx: number
}
type responseType = {
	status: number
	data: getPurchasedTransactionType
}

export const getPurchasedStudentTransactionAPI = async ({idx}: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`student-product/student/transaction/${idx}`)

		return response.data
	} catch (error) {
		throw error
	}
}
