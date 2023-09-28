import {
	MAIN_CLASS,
	MAIN_GOVERNMENT,
	MAIN_FINANCE,
	MAIN_STORE,
	SUB_CLASS_STUDENTS,
	SUB_CLASS_EXCHEQUER,
	SUB_CLASS_OPENING_JOB,
	SUB_CLASS_COUPON,
	SUB_GOVERNMENT_CREDIT,
	SUB_GOVERNMENT_EXCHEQUER,
	SUB_GOVERNMENT_JOB,
	SUB_GOVERNMENT_RULE,
	SUB_GOVERNMENT_ECONOMY,
	SUB_FINANCE_DEPOSIT,
	SUB_FINANCE_INVEST,
	SUB_FINANCE_SAVING,
	SUB_STORE_STUDENT,
	SUB_STORE_TEACHER,
	SUB_CORPORATE_MANAGEMENT,
} from "@/components/teacher/layout/SideBar/SideBarIcons"

export const MAIN_ELEMENT: { [prop: number]: { name: string; label: string; content: any } } = {
	0: { name: "class", label: "우리 반", content: MAIN_CLASS },
	1: { name: "government", label: "정부", content: MAIN_GOVERNMENT },
	2: { name: "finance", label: "금융", content: MAIN_FINANCE },
	3: { name: "store", label: "상점", content: MAIN_STORE },
}

export const SUB_ELEMENT: {
	[prop: number]: {
		[prop: string]: {
			name?: string
			label?: string
			content?: any
			menuIndex?: number
			for?: number
		}
	}
} = {
	0: {
		"/teacher/class/students": {
			name: "view_students",
			label: "학생 정보",
			content: SUB_CLASS_STUDENTS,
			menuIndex: 0,
		},
		"/teacher/class/property": { name: "view_exchequer", label: "국고", content: SUB_CLASS_EXCHEQUER, menuIndex: 1 },
		"/teacher/class/jobsearch": {
			name: "view_job_opening",
			label: "구인 구직",
			content: SUB_CLASS_OPENING_JOB,
			menuIndex: 2,
		},
		"/teacher/class/coupons": { name: "view_coupon", label: "쿠폰", content: SUB_CLASS_COUPON, menuIndex: 3 },
	},
	1: {
		"/teacher/gov/rule": { name: "set_class_rule", label: "학급 규칙", content: SUB_GOVERNMENT_RULE, menuIndex: 0 },
		"/teacher/gov/exchequer": {
			name: "set_exchequer_rule",
			label: "세금 관리",
			content: SUB_GOVERNMENT_EXCHEQUER,
			menuIndex: 1,
		},
		"/teacher/gov/job": { name: "set_job", label: "직업 관리", content: SUB_GOVERNMENT_JOB, menuIndex: 2 },
		"/teacher/gov/license": { name: "set_job", label: "자격증 관리", content: SUB_GOVERNMENT_JOB, menuIndex: 3 },
		// "/teacher/gov/corporate": {
		// 	name: "set_corporate",
		// 	label: "기업 관리",
		// 	content: SUB_CORPORATE_MANAGEMENT,
		// 	menuIndex: 4,
		// },
		// "/teacher/gov/economy": {
		// 	name: "view_economy",
		// 	label: "경제 현황",
		// 	content: SUB_GOVERNMENT_ECONOMY,
		// 	menuIndex: 5,
		// },
		"/teacher/gov/corporate/create": {
			for: 4,
			label: "기업 추가",
		},
	},
	2: {
		"/teacher/finance/deposit": { name: "set_deposit", label: "예금", content: SUB_FINANCE_DEPOSIT, menuIndex: 0 },
		"/teacher/finance/invest": { name: "set_invest", label: "투자", content: SUB_FINANCE_INVEST, menuIndex: 1 },
		"/teacher/finance/saving": { name: "set_saving", label: "적금", content: SUB_FINANCE_SAVING, menuIndex: 2 },
	},
	3: {
		"/teacher/shop/my": {
			name: "teacher_products",
			label: "교사 상품",
			content: SUB_STORE_TEACHER,
			menuIndex: 0,
		},
		// "/teacher/shop/student": {
		// 	name: "student_products",
		// 	label: "학생 상품",
		// 	content: SUB_STORE_STUDENT,
		// 	menuIndex: 1,
		// },
		"/teacher/shop/create": { for: 0, label: "교사 상품" },
		"/teacher/shop/my/[pid]": { for: 0, label: "교사 상품" },
		"/teacher/shop/student/[pid]": { for: 1, label: "학생 상품" },
	},
}
