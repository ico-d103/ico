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
	currency: null
	treasury: number
	stock: null
	trading_start: string
	trading_end: string
	credit_up: number
	credit_down: number
}

export type getGovExchequerType = {
	id: number
	title: string
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
}
