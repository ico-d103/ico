export type getHomeTransactionHistoryType = {
	[prop: string]: TransactionIndividualType[]
}

export type TransactionIndividualType = {
	title: string
	amount: string
	source: string
	balance: string
}

export type getHomeExchequerHistoryType = {
	[prop: string]: ExchequerIndividualType[]
}

export type ExchequerIndividualType = {
	title: string
	amount: string
	source: string
	balance: string
}

export type getHomeCouponType = {
	id: number
	title: string
	count: number
	assigned: boolean
}

export type getFinanceInvestType = {
    stock: string
    account: number
    tradingStart: string
    tradingEnd: string
    myStock: {
        price: number
        amount: number
    }
    issue: FinanceInvestIssueType[]
}

export type FinanceInvestIssueType = {
	date: string
	amount: number
	content: string
}

export type getFinanceDepositRateType = {
	creditRating: number
	shortPeriod: number
	longPeriod: number
	account: number
	myDeposit: {
        interest: number
        startDate: string
        endDate: string
        creditRating: number
        amount: number
        depositAmount: number
    }
}

export type getClassRuleType = {
	id: number
	title: string
	detail: string
}

export type getStudentListType = {
	number: number
	name: string
	jobName: string | null
	creditRating: number
}

export type getHomeMyInfoType = {
    school: string
    room: number
    number: number
    name: string
    account: number
    creditRating: number
    jobImage: null | string
    jobName: null | string
}