import React from 'react'
import { css } from "@emotion/react"
import { removeCookie } from '@/api/cookie'
import useNavigate from '@/hooks/useNavigate'
import useGetTokenStatus from '@/hooks/useGetTokenStatus'
import { getHomeMyInfoType } from '@/types/student/apiReturnTypes'
import LoadImage from '@/components/common/LoadImage/LoadImage'

function NavBarDesktopRightMenu({data}: {data: getHomeMyInfoType}) {
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

        <div css={menuWrapperCSS} onClick={(e) => {e.stopPropagation()}}>
            <div css={menuHeaderCSS}>
                <div css={welcomeSectionCSS}>
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
            
                <div css={css`display: flex; gap: 16px; margin-top: 16px;`}>
                    <div css={labelButtonCSS} onClick={() => {navigate("/student/password", 'bottomToTop')}} >
                        비밀번호 변경
                    </div>
                </div>

            </div>
            
            <div>
                {renderMenu}
            </div>
            
        </div>

  )
}


const menuWrapperCSS = css`
    /* position: fixed; */
    width: 100%;
    height: 100%;
    /* max-width: 360px; */
    /* background-color: var(--student-main-color-soft); */
    /* box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2); */
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
/* height: 15vh; */
background-color: var(--student-main-color);
border-bottom: 1px solid var(--student-main-color-2);
padding: 32px;
display: flex;
flex-direction: column;
/* align-items: center; */
/* justify-content: space-between; */
`

const welcomeSectionCSS = css`
    display: flex;
    align-items: center;
justify-content: space-between;
width: 100%;

`

const labelButtonCSS = css`
font-size: var(--student-h4);
color: rgba(0, 0, 0, 0.6);
`


export default NavBarDesktopRightMenu