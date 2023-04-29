import { navTo } from "@/store/store"
import mainStore from "@/store/store"

function navigate(url: string, transition = 'rightToLeft') {
    mainStore.set(navTo, {url, transition})
}

export default navigate