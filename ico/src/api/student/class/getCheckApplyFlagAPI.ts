import { tokenInstance } from "@/api/instance"

type paramsType = {
	jobId: number
}

type responseType = {
	status: number
	data: string | null
}

export const getCheckApplyFlagAPI = async ({ jobId }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.get(`/resume/student/check/${jobId}`)

		return response.data
	} catch (error) {
		throw error
	}
}
