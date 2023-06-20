import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type certificationType = {
	id: number
	subject: string
	rating: number
}

type roleStatusType = {
	id: number
	status: string
	subject: string
}


type paramsType = {
    idx: number;
    body: {
        title: string
        detail: string
        wage: string
        creditRating: string
        color: string
        image: string
        total: string
        roleStatus: roleStatusType | null
        certification?: certificationType[]
    }
}

type responseType = {
    status: number
    data: successReturnType
}

export const putGovJobAPI = async ({idx, body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.put(`/job/teacher/${idx}`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

