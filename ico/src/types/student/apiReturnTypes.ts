export type getHomeAccountType = {
	account: number
}

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

//-----------------------------------------------------------
// 투자

// export type getFinanceInvestListType = {
// 	myStocks: getFinanceInvestListMyItemType[]
// 	stockList: getFinanceInvestListStockItemType[]
// }

export type getFinanceInvestListStockItemType = {
	id: number
	title: string
}

export type getFinanceInvestListMyItemType = {
	stockId: number
	title: string
	stocklist: getFinanceInvestListMyItemDetailType[]
	// price: number
	// amount: number
	// rate: string
}

export type getFinanceInvestListMyItemDetailType = {
	investId: number
	price: number
	amount: number
	rate: number
}

export type getFinanceInvestDetailType = {
	stock: string
	account: number
	content: string
	// tradingStart: string
	// tradingEnd: string
	myStocks: getFinanceInvestListMyItemDetailType[]
	issue: FinanceInvestDetailIssueType[]
}

export type FinanceInvestDetailIssueType = {
	date: string
	amount: number
	content: string
}

export type getFinanceInvestTimeType = {
	tradingStart: string
	tradingEnd: string
}
//-----------------------------------------------------------

// export type getFinanceDepositRateType = {
// 	creditRating: number
// 	shortPeriod: number
// 	longPeriod: number
// 	account: number
// 	myDeposit: {
// 		interest: number
// 		startDate: string
// 		endDate: string
// 		creditRating: number
// 		amount: number
// 		depositAmount: number
// 	}
// }

// ----------------------------------------------
// 예금
export type myDepositType = {
	id: string
	title: null | string
	interest: number
	startDate: string
	endDate: string
	creditRating: number
	amount: number
	interestAmount: number
	end: boolean
}

export type depositProductType = {
	id: number
	title: string
	period: number
	interest: number
}

export type getFinanceDepositType = {
	account: number
	myDeposit: myDepositType[]
	depositProduct: depositProductType[]
}

// 예금 끝
// ----------------------------------------------
// ----------------------------------------------
// 적금

export type mySavingType = {
	id: string
	title: null | string
	interest: number
	startDate: string
	endDate: string
	creditRating: number
	amount: number
	count: number
	totalCount: number
	interestAmount: number
	day: string
	end: boolean
}

export type savingProductType = {
	id: number
	title: string
	period: number
	interest: number
}

export type getFinanceSavingType = {
	account: number
	mySaving: mySavingType[]
	savingProduct: savingProductType[]
}

//적금 끝
// ----------------------------------------------

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
	color: null | string
	deposit: number
	invest: number
}

export type getJobListType = {
	id: number
	title: string
	creditRating: number
	count: number
	total: number
	image: string
	color: string
}

export type getPurchasedTransactionType = {
	title: string
	seller: string
	type: boolean
	date: string
}

// ---------------------------------
// 교사쪽으로 옮겨야됌!!!!!
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
// ------------------------------------
