export type getGovRuleType = {
	id: number
	title: string
	detail: string
	dateTime: string
}

export type getNationType = {
	id: number
	school: string
	grade: number
	room: number
	title: string
	code: string
	currency: string
	treasury: number
	stock: string | null
	trading_start: string | null
	trading_end: string | null
	credit_up: number
	credit_down: number
}

export type getGovExchequerType = {
	id: number
	title: string
	detail: string
	amount: number
	type: 0 | 1
}

export type getGovJobType = {
	title: string
	detail: string
	creditRating: number
	wage: number
	image: string
	color: string
	total: number
	count: number
	id: number
}

export type getStudentListType = {
	id: number
	name: string
	number: number
	amount: number
	creditRating: number
	job: null | string
}

export type getImmigrationListType = {
	immigrationId: number
	name: string
	number: number
}

export type transanctionType = {
	title: string
	amount: number
}

export type transactionsType = {
	[date: string]: transanctionType[]
}

export type getStudentDetailType = {
	studentId: number
	studentName: string
	creditScore: number
	transactions: transactionsType
	frozen: boolean
}

export type getTeacherProductsType = {
	id: string
	title: string
	amount: number
	image: string
	count: number
	sold: number
	date: string
	name: string
	rental: boolean
	assigned: boolean
}

export type getStudentProductsType = {
	id: string
	title: string
	amount: number
	image: string
	count: number
	sold: number
	date: string
	name: string
	assigned: boolean
}
