import { defaultInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
    idx: number;
    body: {
        title: string,
        detail: string
    }
}

type responseType = {
    status: number
    data: successReturnType
}

export const putGovRuleAPI = async ({idx, body}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.put(`/rule/teacher/${idx}`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

