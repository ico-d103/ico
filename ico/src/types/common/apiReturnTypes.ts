export type successReturnType = "OK"

export type errorReturnType = {
	code: string
	message: string
}

export type postDuplicationCheckType = {
	message: string
	isDuplicated: boolean
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