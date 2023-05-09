export type getGovRuleType = {
    "id": number,
    "title": string,
    "detail": string,
    "dateTime": string
}

export type getGovExchequerType = {
    "id": number
    "title": string
    "amount": number
    "type": 0 | 1
}

export type getGovJobType = {
    "title": string
    "detail": string
    "creditRating": number
    "wage": number
    "image": string
    "color": string
    "total": number
    "count": number
}