import { createStore, atom } from "jotai"

export const mainStore = createStore()

const navTo = atom({ url: "", transition: "" })

const navBeforeScroll = atom(0)

const selectedStudent = atom(-1)

export default mainStore

export { navTo, navBeforeScroll, selectedStudent }
