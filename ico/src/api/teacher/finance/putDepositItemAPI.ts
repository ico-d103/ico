// 투자 이슈 조회(교사)
import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	idx: number
	body: {
		title: string
		period: number
		interest: number[]
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const putDepositItemAPI = async ({ idx, body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.put(`/deposit-product/teacher/${idx}`, body)

		return response.data
	} catch (error) {
		throw error
	}
}
