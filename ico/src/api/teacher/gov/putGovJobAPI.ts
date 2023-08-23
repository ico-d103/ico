import { tokenInstance } from "@/api/instance"
import { empoweredType } from "@/types/teacher/apiReturnTypes"
import { successReturnType } from "@/types/common/apiReturnTypes"

type jobLicenseListType = {
	id: number
	rating: number
}

type paramsType = {
    idx: number;
    body: {
        title: string
        detail: string
        salary: string
        creditRating: string
        color: string
        image: string
        total: string
        empowered: empoweredType[]
        jobLicenseList?: jobLicenseListType[]
    }
}

type responseType = {
    status: number
    data: successReturnType
}

export const putGovJobAPI = async ({idx, body}: paramsType) => {
    console.log('body => ', body)
    try {
        const response: responseType = await tokenInstance.put(`/job/teacher/${idx}`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

