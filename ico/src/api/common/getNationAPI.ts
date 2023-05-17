import { tokenInstance } from "@/api/instance"
import { getNationType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: getNationType
}

export const getNationAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/nation")

		return response.data
	} catch (error: any) {

		if (error.response.data.code === '202') {
			console.log('나라 없음!')
		} else {
			throw error
		}
		
	}
}
