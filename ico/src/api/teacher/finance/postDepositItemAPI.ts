// 투자 이슈 등록
import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
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

export const postDepositItemAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post("/deposit-product/teacher", body)
		return response.data
	} catch (error) {
		throw error
	}
}
