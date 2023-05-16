import { getTokenStatusAPI } from '@/api/common/getTokenStatusAPI'
import React from 'react'
import { nationData, tokenStatus } from "@/store/store"
import { useSetAtom, useAtom } from "jotai"
import { getTokenStatusType } from '@/types/common/apiReturnTypes'


function useGetTokenStatus(): [getTokenStatusType, ({showMessage}: {showMessage: boolean}) => Promise<void | getTokenStatusType>] {
    const [tokenStatusAtom, setTokenStatusAtom] = useAtom(tokenStatus)
    const refresh = ({showMessage = true}) => {
        return getTokenStatusAPI()
        .then((res) => {
            if (res) {
                setTokenStatusAtom(() => { return {...res, showMessage}})
            }
            return(res)
        })
        .catch((error) => {
            setTokenStatusAtom(() => {
                return {
                    status: "require_login",
                    role: "GUEST",
                    showMessage
                }
            })
        })
    }
    return [tokenStatusAtom, refresh]
}

export default useGetTokenStatus