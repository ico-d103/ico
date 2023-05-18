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

export type getTokenStatusType = {
	status: tokenStatusIndividual | null
	role: tokenRoleIndividual | null
	showMessage: boolean
}

export type layoutTokenStatusType = {
	status: tokenStatusIndividual[]
	role: tokenRoleIndividual[]
}

export type tokenRoleIndividual = 'STUDENT' | 'TEACHER' | 'GUEST' | 'ADMIN'
export type tokenStatusIndividual = 'admin' | 'require_login' | 'require_submit_code' | 'require_refresh_token' | 'require_submit_certification' | 'require_create_nation' | 'require_approval' | 'approved'
