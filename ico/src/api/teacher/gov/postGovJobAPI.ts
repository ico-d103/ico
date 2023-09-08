import { tokenInstance } from "@/api/instance"
// import { empoweredType } from "@/components/teacher/Gov/Job/GovJobItemType"
import { empoweredType } from "@/types/teacher/apiReturnTypes"
import { successReturnType } from "@/types/common/apiReturnTypes"

type jobLicenseListType = {
	id: number
	subject: string
	rating: number
}

type paramsType = {
	body: {
		title: string
		detail: string
		// salary: string
		wage: string
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

export const postGovJobAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await tokenInstance.post(`/job/teacher`, body)
		return response.data
	} catch (error) {
		throw error
	}
}
