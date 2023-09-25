import { NAVBAR_CLASS, NAVBAR_GOVERNMENT, NAVBAR_STORE, NAVBAR_HOME } from "@/components/student/layout/NavBar/NavBarIcons"


export const NAVBAR_ROUTES: { [prop: string]: number } = {
  "/student/home": 0,
  "/student/home/asset": 0,
  "/student/home/coupon": 0,
  "/student/home/exchequer": 0,
  "/student/job/rule": 0,
  "/student/job/rule/create": 0,
  "/student/job/rule/[ruleId]": 0,
  "/student/job/seller": 0,
  "/student/job/seller/[pid]": 0,
  "/student/job/seller/[pid]/update": 0,
  "/student/job/seller/create": 0,
  "/student/finance/deposit": 0,
  "/student/finance/deposit/[pid]": 0,
  "/student/finance/savings": 0,
  "/student/finance/savings/[pid]": 0,
  "/student/finance/invest": 0,
  "/student/finance/invest/[pid]": 0,
  "/student/class/students": 1,
  "/student/class/jobsearch": 1,
  "/student/gov/rule": 2,
  "/student/gov/exchequer": 2,
  "/student/gov/job": 2,
  "/student/shop/teacher": 3,
  "/student/shop/student": 3,
  "/student/shop/create": 3,
  "/student/shop/teacher/[pid]": 3,
  "/student/shop/student/[pid]": 3,
  "/student/shop/basket": 3,
}

export const NAVBAR_ELEMENT: { [prop: number]: { url: string; name: string; label: string; content: any; function: Function } } =
  {
    0: { url: "/student/home", name: "home", label: "홈", content: NAVBAR_HOME, function: () => {} },
    1: { url: "/student/class/students", name: "class", label: "우리반", content: NAVBAR_CLASS, function: () => {} },
    2: { url: "/student/gov/rule", name: "gov", label: "정부", content: NAVBAR_GOVERNMENT, function: () => {} },
    3: { url: "/student/shop/teacher", name: "store", label: "상점", content: NAVBAR_STORE, function: () => {} },
  }
