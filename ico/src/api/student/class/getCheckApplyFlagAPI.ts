import { tokenInstance } from "@/api/instance"

type paramsType = {
	jobId: number
}

type responseType = {
	status: number
	data: boolean
}

export const getCheckApplyFlagAPI = async ({ jobId }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/resume/student/check/${jobId}`)
		console.log("getCheckApplyFlagAPI : ", response)

		return response.data
	} catch (error) {
		throw error
	}
}
