import { createStore, atom } from "jotai"

export const mainStore = createStore()

const navTo = atom({ url: "", transition: "" })

const navBeforeScroll = atom(0)

const isNavigating = atom(false)

const selectedStudent = atom(-1)

const isDepositMenuOpen = atom(true)

const stackNotification = atom<{ [prop: number]: { width: number; height: number; duration: number; content: any } }>(
	{},
)

const selectedPage = atom(1)

export { navTo, navBeforeScroll, selectedStudent, isNavigating, isDepositMenuOpen, stackNotification, selectedPage }
