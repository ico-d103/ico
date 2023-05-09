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

