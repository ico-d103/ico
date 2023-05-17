// 투자 이슈 등록
import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		stock: string
		tradingStart: string
		tradingEnd: string
		amount: number
		content: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postInvestIssueAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/nation/teacher/stock", body)
		return response.data
	} catch (error) {
		throw error
	}
}
