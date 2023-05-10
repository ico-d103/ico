import { createStore, atom } from "jotai"

export const mainStore = createStore()

const navTo = atom({ url: "", transition: "" })

const navBeforeScroll = atom(0)

const isNavigating = atom(false)

const selectedStudent = atom(-1)

export { navTo, navBeforeScroll, selectedStudent, isNavigating }
