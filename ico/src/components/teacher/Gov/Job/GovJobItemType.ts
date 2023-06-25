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

export type roleStatusType = {
	status: string
	subject: string
}

export type GovRuleClassDetailProps = {
	title?: string
	detail?: string
	wage?: number
	creditRating?: number
	color?: string
	image?: string
	total?: number
	count?: number
	idx?: number
	currency?: string
	roleStatus?: roleStatusType | null
	roleStatusList: roleStatusType[]
	certification: certificationType[]
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
	roleStatus: roleStatusType | null
	certification: certificationType[]
}

export type validType = {
	title: validItemType
	detail: validItemType
	wage: validItemType
	creditRating: validItemType
	color: validItemType
	image: validItemType
	total: validItemType
	roleStatus: validItemType
	certification: validItemType
}
