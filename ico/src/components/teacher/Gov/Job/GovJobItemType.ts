import { empoweredType, getGovPowerType, getLicenseType } from "@/types/teacher/apiReturnTypes"
import { jobLicenseListType } from "@/types/teacher/apiReturnTypes"

export const obj = {
	changed: "changed",
	notChanged: "notChanged",
	empty: "empty",
	notValid: "notValid",
} as const
type Union<T> = T[keyof T]
export type validItemType = Union<typeof obj>




export type GovRuleClassDetailProps = {
	title?: string
	detail?: string
	wage?: string
	creditRating?: number
	color?: string
	image?: string
	total?: number
	count?: number
	idx?: number
	currency?: string
	empowered?: empoweredType[]
	powerList: getGovPowerType[]
	jobLicenseList?: jobLicenseListType[]
	licenseList: getLicenseType[]
	closeHandler?: Function
}

export type inputType = {
	title: string
	detail: string
	wage: string
	creditRating: string
	color: string
	image: string
	total: string
	empowered: empoweredType[]
	jobLicenseList: jobLicenseListType[]
}

export type validType = {
	title: validItemType
	detail: validItemType
	wage: validItemType
	creditRating: validItemType
	color: validItemType
	image: validItemType
	total: validItemType
	empowered: validItemType
	jobLicenseList: validItemType
}
