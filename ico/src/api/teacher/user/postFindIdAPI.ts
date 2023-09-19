import { defaultInstance } from "@/api/instance"

type paramsType = {
	body: {
		phoneNum: string
	}
}

type responseType = {
	status: number
	data: string
}

export const postFindIdAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await defaultInstance.post("/teacher/find-id", body)

		return response.data
	} catch (error) {
		throw error
	}
}
