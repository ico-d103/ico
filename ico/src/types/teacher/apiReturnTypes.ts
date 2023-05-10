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

export type studentDetailTransactionType = {
	title: string
	amount: number
}

export type getStudentDetailType = {
	studentId: number
	studentName: string
	creditScore: number
	transactions: studentDetailTransactionType[]
	frozen: boolean
}

// {
//     "studentId": 1,
//     "studentName": "test",
//     "creditScore": 500,
//     "transactions": {
//         "2023.05.06": [
//             {
//                 "title": "거래 내역 누락",
//                 "amount": 100
//             }
//         ],
//         "2023.05.04": [
//             {
//                 "title": "벌금",
//                 "amount": -100
//             },
//             {
//                 "title": "벌금",
//                 "amount": -100
//             },
//             {
//                 "title": "거래 내역 누락",
//                 "amount": 100
//             }
//         ]
//     },
//     "frozen": false
// }

// {
//     "studentId": 1,
//     "studentName": "test",
//     "creditScore": 500,
//     "transactions": {},
//     "frozen": false
// }
