// 투자 이슈 등록
import { tokenInstance } from "@/api/instance"
import { getNationType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: getNationType
}

export const postInvestIssueAPI = async () => {
	try {
		const response: responseType = await tokenInstance.post("/stock/teacher/upload")

		return response.data
	} catch (error) {
		throw error
	}
}
