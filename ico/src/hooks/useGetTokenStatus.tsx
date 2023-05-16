import { getTokenStatusAPI } from '@/api/common/getTokenStatusAPI'
import React from 'react'
import { nationData, tokenStatus } from "@/store/store"
import { useSetAtom, useAtom } from "jotai"
import { getTokenStatusType } from '@/types/common/apiReturnTypes'


function useGetTokenStatus(): [getTokenStatusType, () => Promise<void | getTokenStatusType>] {
    const [tokenStatusAtom, setTokenStatusAtom] = useAtom(tokenStatus)
    const refresh = () => {
        return getTokenStatusAPI()
        .then((res) => {
            if (res) {
                setTokenStatusAtom(() => res)
            }
            return(res)
        })
        .catch((error) => {
            setTokenStatusAtom(() => {
                return {
                    status: "require_login",
                    role: "GUEST",
                }
            })
        })
    }
    return [tokenStatusAtom, refresh]
}

export default useGetTokenStatus