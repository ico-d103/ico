import { empoweredType, getGovPowerType } from "@/types/teacher/apiReturnTypes"

export const obj = {
	changed: "changed",
	notChanged: "notChanged",
	empty: "empty",
	notValid: "notValid",
} as const
type Union<T> = T[keyof T]
export type validItemType = Union<typeof obj>

export type certificationType = {
	id: number
	subject: string
	rating: number
}


export type GovRuleClassDetailProps = {
	title?: string
	detail?: string
	salary?: number
	creditRating?: number
	color?: string
	image?: string
	total?: number
	count?: number
	idx?: number
	currency?: string
	empowered?: empoweredType[]
	powerList: getGovPowerType[]
	certification: certificationType[]
	closeHandler?: Function
}

export type inputType = {
	title: string
	detail: string
	salary: string
	creditRating: string
	color: string
	image: string
	total: string
	empowered: empoweredType[]
	certification: certificationType[]
}

export type validType = {
	title: validItemType
	detail: validItemType
	salary: validItemType
	creditRating: validItemType
	color: validItemType
	image: validItemType
	total: validItemType
	empowered: validItemType
	certification: validItemType
}
