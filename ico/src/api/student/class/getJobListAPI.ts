import { tokenInstance } from "@/api/instance"
import { getJobListType } from "@/types/student/apiReturnTypes"

type responseType = {
	status: number
	data: getJobListType[]
}

export const getJobListAPI = async () => {
	try {
		const response: responseType = await tokenInstance.get("/job/student")

		return response.data
	} catch (error) {
		throw error
	}
}
