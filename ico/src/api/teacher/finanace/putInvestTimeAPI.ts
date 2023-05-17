import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type bodyType = {
	body: {
		tradingStart: string
		tradingEnd: string
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const putInvestTimeAPI = async ({ body }: bodyType) => {
	try {
		const response: responseType = await tokenInstance.put("/nation/teacher/trading-time", body)

		return response.data
	} catch (error) {
		throw error
	}
}
