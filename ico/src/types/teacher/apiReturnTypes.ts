export type getGovRuleType = {
	id: number
	title: string
	detail: string
	dateTime: string
	author: string
	createdAt: string
	updatedAt: string
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
	restJobCount: number
	jobList: getGovJobItemType[]
}

export type getGovJobItemType = {
	title: string
	detail: string
	creditRating: number
	wage: number
	image: string
	color: string
	total: number
	count: number
	id: number
	studentNames: string[]
	empowered: string[]
}

export type getGovJobAuthType = {
	id: number
	name: string
}[]

export type getStudentListType = {
	id: number
	name: string
	number: number
	amount: number
	creditRating: number
	creditScore: number
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

export type licenseType = {
	id: number
	subject: string
	rating: number
}

export type getStudentDetailType = {
	studentId: number
	studentName: string
	transactions: transactionsType
	frozen: boolean
	size: number
	licenses: licenseType[]
}

// 상점
export type getTeacherProductsType = {
	id: number
	title: string
	amount: number
	images: string[]
	count: number
	sold: number
	date: string
	isCoupon: boolean
}

export type getTeacherProductDetailType = {
	id: number
	title: string
	amount: number
	images: string[]
	detail: string
	count: number
	sold: number
	date: string
	isCoupon: boolean
}

// 상점 끝
//--------------------------------------------------------------------

export type getStudentProductsType = {
	id: number
	title: string
	amount: number
	images: string[]
	count: number
	sold: number
	date: string
	name: string
	assigned: boolean
}

export type getStudentProductDetailType = {
	id: number
	title: string
	amount: number
	images: string[]
	count: number
	sold: number
	date: string
	rental: boolean
	detail: string
	assigned: boolean
	seller: boolean
}

export type getNationTreasuryType = {
	treasury: number
}

export type getTreasuryHistoryPageType = {
	id: string
	date: string
	title: string
	source: string
	amount: string
}

export type getTreasuryHistoryType = {
	size: number
	page: getTreasuryHistoryPageType[]
}

export type getCouponListType = {
	id: string
	number: number
	name: string
	title: string
	date: string
}

export type jobListType = {
	id: number
	title: string
	image: string
	color: string
	creditRating: number
	total: number
	wage: string
	count: number
	studentNames: string[] | string
	empowered: string[]
	jobLicenseList: jobLicenseListType[]
	detail: string
}

export type jobLicenseListType = {
	id: number
	subject: string
	rating: number
}

export type getJobListType = {
	restJobCount: number
	jobList: jobListType[]
}

export type getJobApplierType = {
	resumeId: string
	name: string
	number: number
}

export type interstType = {
	longPeriod: string[]
	shortPeriod: string[]
}

export type getGovEconomyType = {
	date: string
	totalAccount: number
	totalAmount: number
}

export type getLicenseType = {
	id: number
	subject: string
}

export type getTeacherInfoType = {
	identity: string
	phoneNum: string
}

export type studentLicenseBodyType = {
	[key: number]: number
}

export type getGovPowerType = {
	id: number
	name: string
	detail: string
}

export type empoweredType = string

export type depositProductType = {
	id: number
	title: string
	period: number
	interest: number[]
	students: depositProductStudentType[]
}

export type depositProductStudentType = {
	number: number
	name: string
	amount: number
	startDate: string
}

export type investListType = {
	id: number
	title: string
}

export type investItemType = {
	stock: string
	content: string
	tradingStart: string
	tradingEnd: string
	issue: investIssueType[]
}

export type investIssueType = {
	date: string
	amount: number
	content: string
	rate: number
}

export type investTimeType = {
	tradingStart: string
	tradingEnd: string
}

export type getFinanceInvestIssueType = {
	stock: string
	tradingStart: string
	tradingEnd: string
	issue: FinanceInvestIssueType[]
}

export type FinanceInvestIssueType = {
	date: string
	amount: number
	content: string
}

export type savingListType = {
	id: number
	title: string
	count: number
	amount: number
	interest: number[]
	students: savingListStudentType[]
}

export type savingListStudentType = {
	
}