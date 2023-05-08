import { defaultInstance } from "@/api/instance"
import { postDuplicationCheckType } from "@/types/common/apiReturnTypes"

type bodyType = {
	identity: string
}

type responseType = {
	status: number
	data: postDuplicationCheckType
}

export const postDuplicationCheck = async (body: bodyType) => {
	try {
		console.log(body)
		const response: responseType = await defaultInstance.post("/duplicated-id", body)
		console.log(response)

		return response.data
	} catch (error) {
		console.log(error)
	}
}
