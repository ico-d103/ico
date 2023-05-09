import { defaultInstance } from "@/api/instance"

type bodyType = {
	body: {
		identity: string
		password: string
	}
}

type responseType = {
	status: number
	data: string
}

export const postLoginAPI = async ({ body }: bodyType) => {
	try {
		const response: responseType = await defaultInstance.post("/login", body)

		if (response.status === 200) return response.data
	} catch (error) {
		throw error
	}
}
