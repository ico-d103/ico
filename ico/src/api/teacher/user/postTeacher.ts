import { defaultInstance } from "@/api/instance"

type paramsType = {}

type bodyType = {
	name: string
	identity: string
	password: string
	checkedPassword: string
}

type responseType = {
	status: string
	response: returnType
}

type returnType = {} // 추후 types에서 가져올 것임

export const postTeacher = async (body: bodyType) => {
	try {
		// 구조 분해 버전으로 해서 console.log 찍어보기
		const response: responseType = await defaultInstance.post("/teacher", body)

		// 하단은 예시 코드
		if (response.status === "success") return response
		else return response
	} catch (error) {
		console.log(error)
	}
}
