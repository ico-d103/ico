import React, {useState} from 'react'
import { postLoginAPI } from '@/api/common/postLoginAPI'
import useGetTokenStatus from '@/hooks/useGetTokenStatus'
import { setCookie } from '@/api/cookie'
import { useRouter } from 'next/router'
import { css } from "@emotion/react"

function login() {
    const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const router = useRouter()

    const loginHandler = () => {
        postLoginAPI({body: {identity: id, password: pw}})
        .then((lres) => {
            console.log('로그인 성공')
            setCookie("Authorization", lres, { path: "/", maxAge: 30 * 24 * 60 * 60 })
            setTokenStatus({showMessage: false})
        })
    }

    
  return (
    <div css={css`display: flex; flex-direction: column;`}>
        <input value={id} onChange={(e) => {setId(e.target.value)}} />
        <input value={pw} onChange={(e) => {setPw(e.target.value)}}/>
        <button onClick={loginHandler}>로그인</button>
    </div>
  )
}

export default login