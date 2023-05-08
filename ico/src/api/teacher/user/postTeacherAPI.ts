import { defaultInstance } from "@/api/instance"

type paramsType = {
	body: {
		name: string
		identity: string
		password: string
		checkedPassword: string
	}
}

type responseType = {
	status: number
	data: string
}

export const postTeacherAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await defaultInstance.post("/teacher", body)

		if (response.data === "OK") return true
		return false
	} catch (error) {
		console.log(error)
	}
}
