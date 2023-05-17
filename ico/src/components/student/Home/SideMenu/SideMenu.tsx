import React from 'react'
import { css } from "@emotion/react"
import { removeCookie } from '@/api/cookie'
import useNavigate from '@/hooks/useNavigate'
import useGetTokenStatus from '@/hooks/useGetTokenStatus'
import { getHomeMyInfoType } from '@/types/student/apiReturnTypes'
import LoadImage from '@/components/common/LoadImage/LoadImage'

function SideMenu({closeComp, data}: {closeComp?: Function; data: getHomeMyInfoType}) {
    const navigate = useNavigate()
    const [getTokenStatus, setTokenStatus] = useGetTokenStatus()

    const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
        setTokenStatus({showMessage: false}).then((res) => {
            console.log('여기에 할일')
        })
		// navigate("/teacher/login")
	}

    const menu = [{content: <img src={"/assets/side_menu/student_logout.png"} css={css`height: 100%; width: auto;`}/>, label: '로그아웃', function: () => {signoutHandler()} }]

    const renderMenu = menu.map((el, idx) => {
        return (
            <div css={menuItemCSS} onClick={el.function}>
                {el.content}
                {el.label}
            </div>
        )
    })
  return (
    <div css={wrapperCSS} onClick={() => {closeComp && closeComp()}}>
        <div css={menuWrapperCSS} onClick={(e) => {e.stopPropagation()}}>
            <div css={menuHeaderCSS}>
                <div>
                <div css={css`font-size: var(--student-h2);`}>
                    {data.name}님 환영해요!
                </div>
                <div css={css`margin-top: 8px;`}>
                    {data.school} {data.room}반 {data.number}번
                </div>
                </div>
                <LoadImage src={"/assets/dock/dock_gov.png"} alt={'deco'} wrapperCss={css`width: 64px; height: 64px;`} />
                
            </div>
            <div>
                {renderMenu}
            </div>
            
        </div>
    </div>
  )
}

const wrapperCSS = css`
    width: 100vw;
    height: 100vh;
    /* position: fixed; */
    display: flex;
    justify-content: flex-end;
    
    /* background-color: red; */
`

const menuWrapperCSS = css`
    position: fixed;
    width: 80vw;
    height: 100%;
    max-width: 360px;
    background-color: var(--student-main-color-soft);
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;;
`

const menuItemCSS = css`
    width: 100%;
    height: 64px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 16px;
    padding-left: 16px;
    font-size: var(--student-h2);
    border-top: 1px solid var(--student-main-color-2);
    background-color: var(--student-main-color);

`

const menuHeaderCSS = css`
width: 100%;
height: 15vh;
background-color: var(--student-main-color);
border-bottom: 1px solid var(--student-main-color-2);
padding: 32px;
display: flex;
align-items: center;
justify-content: space-between;
`


export default SideMenu