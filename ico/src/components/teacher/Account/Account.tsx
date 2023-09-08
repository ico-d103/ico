import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getTeacherInfoAPI } from "@/api/teacher/user/getTeacherInfoAPI"
import { getTeacherInfoType } from "@/types/teacher/apiReturnTypes"
import AccountItem from "./AccountItem"
import { css } from "@emotion/react"
import useGetNation from "@/hooks/useGetNation"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import { useRouter } from "next/router"

function Account() {
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getTeacherInfoType>(
		["teacher", "information"],
		getTeacherInfoAPI,
		// { staleTime: 200000 },
	)

	const [nation] = useGetNation()
	const noti = useNotification()
  const router = useRouter()

	const copyCodeHandler = () => {
		navigator.clipboard.writeText(nation.code).then(() => {
			noti({ content: <NotiTemplate type={"ok"} content={"입장 코드를 복사하였습니다!"} />, duration: 3000 })
		})
	}

  const changePasswordHandler = () => {
    router.push('/teacher/password')
  }

	const PROFILE_ICON = (
		<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M106.666 112C106.666 104.557 106.666 100.835 105.748 97.8072C103.679 90.9891 98.3439 85.6535 91.5258 83.5853C88.4975 82.6666 84.776 82.6666 77.333 82.6666H50.6664C43.2233 82.6666 39.5018 82.6666 36.4736 83.5853C29.6554 85.6535 24.3199 90.9891 22.2516 97.8072C21.333 100.835 21.333 104.557 21.333 112M87.9997 40C87.9997 53.2548 77.2545 64 63.9997 64C50.7448 64 39.9997 53.2548 39.9997 40C39.9997 26.7452 50.7448 16 63.9997 16C77.2545 16 87.9997 26.7452 87.9997 40Z"
				stroke="white"
				strokeOpacity="0.7"
				strokeWidth="7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)

	return (
		<div css={accountWrapperCSS}>
			<div css={profileSectorCSS}>
        <div css={profileIconWrapperCSS}>
          {PROFILE_ICON}
        </div>
        <div css={textButtonCSS} onClick={changePasswordHandler}>
          비밀번호 변경
        </div>
        
        
      </div>

				<div css={sectorCSS}>
					<AccountItem title={"아이디"} content={data && data.identity} />
					<AccountItem title={"전화번호"} content={data && data.phoneNum} noLine={true} />
				</div>

			<div css={separatorCSS} />
			<div css={sectorCSS}>
				<AccountItem title={"학교 명"} content={nation.school} />
				<AccountItem title={"학년 / 반"} content={`${nation.grade}학년 ${nation.room}반`} />
				<AccountItem
					title={"입장 코드"}
					content={nation.code}
					rightContent={
						<div css={textButtonCSS} onClick={copyCodeHandler}>
							복사
						</div>
					}
					noLine={true}
				/>
				{/* {JSON.stringify(nation)} */}
			</div>
			<div css={separatorCSS} />
			<div css={sectorCSS}>
				<AccountItem title={"국가 명"} content={nation.title} noLine={true} />
			</div>
		</div>
	)
}

const accountWrapperCSS = css`
	width: 640px;
	
	/* height: 80vh; */
	background-color: white;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
  overflow-y: scroll;
  max-height: 80vh;
`

const profileSectorCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
  padding: 32px;
`

const sectorCSS = css`
	/* padding: 36px; */
`

const separatorCSS = css`
	width: 100%;
	height: 12px;
	background-color: rgba(0, 0, 0, 0.03);
`

const textButtonCSS = css`
	font-size: var(--teacher-h5);
	color: rgba(0, 0, 0, 0.6);
	cursor: pointer;
`

const profileIconWrapperCSS = css`
  width: 128px;
  height: 128px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 16px;
`

export default Account
