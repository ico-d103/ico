// 투자 이슈 조회(교사)
import { tokenInstance } from "@/api/instance"
import { getNationType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: getNationType
}

export const postInvestItemAPI = async () => {
	try {
		const response: responseType = await tokenInstance.put("/interest/teacher")

		return response.data
	} catch (error) {
		throw error
	}
}
