import { tokenInstance } from "@/api/instance"
// import { getNationType } from "@/types/common/apiReturnTypes"

// type responseType = {
// 	status: number
// 	data: getNationType
// }

export const getDepositInterestListAPI = async () => {
	try {
		const response = await tokenInstance.get("/interest")

		return response.data
	} catch (error) {
		throw error
	}
}
