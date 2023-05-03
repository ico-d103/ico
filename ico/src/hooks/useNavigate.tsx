import React from 'react'
import { navTo } from "@/store/store"
import { useAtom } from "jotai"
import { useRouter } from 'next/router'

function useNavigate() {
    const router = useRouter()
    const [navToAtom, setNavToAtom] = useAtom(navTo)

    function navigate(url: string, transition = 'rightToLeft', isGoBack = false) {
        if (router.pathname !== url && navToAtom.url === "") {
            setNavToAtom(() => {return {url, transition, isGoBack: isGoBack}})
        }
    }


  return navigate
}

export default useNavigate