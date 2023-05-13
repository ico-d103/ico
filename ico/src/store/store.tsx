import { createStore, atom } from "jotai"
import { getNationType } from "@/types/common/apiReturnTypes"

export const mainStore = createStore()

const navTo = atom({ url: "", transition: "" })

const navBeforeScroll = atom(0)

const isNavigating = atom(false)

const selectedStudent = atom(-1)

const isDepositMenuOpen = atom(true)


const stackNotification = atom<{ [prop: number]: { width: string; height: string; duration: number; content: any } }>(
	{},
	
)

const selectedPage = atom(1)


const nationData = atom<getNationType>({
			id: 0,
			school: "초등학교",
			grade: 0,
			room: 0,
			title: "국가",
			code: "00000",
			currency: "",
			treasury: 0,
			stock: "",
			trading_start: "",
			trading_end: "",
			credit_up: 0,
			credit_down: 0,
})

export { navTo, navBeforeScroll, selectedStudent, isNavigating, isDepositMenuOpen, stackNotification, selectedPage, nationData }
