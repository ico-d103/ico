import { defaultInstance } from "@/api/instance"
import { postDuplicationCheckType } from "@/types/common/apiReturnTypes"

type bodyType = {
	id: string
}

type responseType = postDuplicationCheckType

export const postDuplicationCheck = async (body: bodyType) => {
	try {
		const response: responseType = await defaultInstance.post("/duplicated-id", body)

		return response.duplication
	} catch (error) {
		console.log(error)
	}
}
