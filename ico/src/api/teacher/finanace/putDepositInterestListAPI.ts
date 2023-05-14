// 투자 이슈 조회(교사)
import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type bodyType = {
	body: {
		shortPeriod: string[]
		longPeriod: string[]
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const putDepositInterestListAPI = async ({ body }: bodyType) => {
	try {
		const response: responseType = await tokenInstance.put("/interest/teacher", body)

		return response.data
	} catch (error) {
		throw error
	}
}
