// 투자 이슈 조회(교사)
import { tokenInstance } from "@/api/instance"
import { getNationType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: getNationType
}

export const getInvestItemAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/stock/teacher")
		return response.data
	} catch (error) {
		throw error
	}
}
