export type getHomeTransactionHistoryType = {
    [prop: string]: TransactionIndividualType[]
}

export type TransactionIndividualType = {
    title: string
    amount: string
    source: string
    balance: string
}

export type getHomeCouponType = {
    id: number,
    title: string,
    count: number,
    assigned: boolean
}

export type getFinanceInvestType = {
    stock: string
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
