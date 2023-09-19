import { tokenInstance } from "@/api/instance"
// import { empoweredType } from "@/components/teacher/Gov/Job/GovJobItemType"
import { empoweredType } from "@/types/teacher/apiReturnTypes"
import { successReturnType } from "@/types/common/apiReturnTypes"



type paramsType = {
	body: {
		date : number
	}
}

type responseType = {
	status: number
	data: successReturnType
}

export const postGovPaydayAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/nation/teacher/payday`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
