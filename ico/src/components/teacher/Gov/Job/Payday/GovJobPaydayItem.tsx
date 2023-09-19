import React from 'react'
import { css } from "@emotion/react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postGovPaydayAPI } from '@/api/teacher/gov/postGovPaydayAPI'
import useNotification from '@/hooks/useNotification'
import NotiTemplate from '@/components/common/StackNotification/NotiTemplate'
import { deleteGovPaydayAPI } from '@/api/teacher/gov/deleteGovPaydayAPI'

type GovJobPaydayItemPropsType = {
  day: number
  canOverTheMonth: boolean
  isSelected: boolean
}

function GovJobPaydayItem({day, canOverTheMonth, isSelected}: GovJobPaydayItemPropsType) {
  const noti = useNotification()
  const queryClient = useQueryClient()

	const postMutation = useMutation((date: number) => {
		return postGovPaydayAPI({
			body: {date}
		})
	})

  const deleteMutation = useMutation((date: number) => {
		return deleteGovPaydayAPI({
			day: date
		})
	})

	const submitHandler = () => {
    if (isSelected) {
      deleteMutation.mutate(day, {
				onSuccess: (formData) => {
					noti({ content: <NotiTemplate type={"ok"} content={"월급 날짜를 삭제하였습니다."} />, duration: 5000 })
					return queryClient.invalidateQueries(["teacher", "govPayday"]) // 'return' wait for invalidate
				},
        onError: (error: any) => {
          noti({ content: <NotiTemplate type={"alert"} content={error.response.data.message} />, duration: 5000 })
        }
			})
    } else {
      postMutation.mutate(day, {
				onSuccess: (formData) => {
					noti({ content: <NotiTemplate type={"ok"} content={"월급 날짜를 지정하였습니다."} />, duration: 5000 })
					return queryClient.invalidateQueries(["teacher", "govPayday"]) // 'return' wait for invalidate
				},
        onError: (error: any) => {
          noti({ content: <NotiTemplate type={"alert"} content={error.response.data.message} />, duration: 5000 })
        }
			})
    }
			
		
	}


  const onClickDayHandler = () => {

  }
  return (
    <div css={itemWrapperCSS({canOverTheMonth, isSelected})} onClick={submitHandler}>
      {day}
      {canOverTheMonth && <div className={"day-message"} css={messageWrapperCSS}>
        <div css={messageBodyCSS}>당월에 해당 날짜가 없으면 당월 마지막 날에 월급이 지급됩니다.</div>
        <div css={arrowCSS}/>
      </div>}
    </div>
  )
}

const itemWrapperCSS = ({canOverTheMonth, isSelected}: {canOverTheMonth: boolean; isSelected: boolean}) => {
  return css`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${isSelected ? `var(--teacher-main-color-2)` : (canOverTheMonth ? `rgba(250, 200, 170, 0.5)` : `rgba(0, 0, 0, 0.05)`)};
  color: ${isSelected ? `white` : `black`};
  user-select: none;
  cursor: pointer;

  transition-property: background-color color;
  transition-duration: 0.5s;

  &:hover {
    background-color: ${isSelected ? `var(--teacher-main-color-3)` : (canOverTheMonth ? `rgba(250, 200, 170, 1)` : `rgba(0, 0, 0, 0.15)`)};
    & .day-message {
      opacity: 100%;
    }
  }
`
}

const messageWrapperCSS = css`
  position: absolute;
  top: -84px;
  z-index: 999999;
  transition-property: opacity;
  transition-duration: 0.5s;
  pointer-events: none;
  opacity: 0;
  color: black;
  left: -40px;
`

const arrowCSS = css`
  width: 10px;
  height: 10px;
  border-top: 10px solid white;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 0px solid transparent;

  position: relative;
  z-index: 10;
  left: 54px;


`

const messageBodyCSS = css`
  /* position: relative; */
  /* margin: 50px; */
  /* width: 400px; */
  width: 500px;
  padding: 24px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
  cursor: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* &:after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
  } */
`;

export default GovJobPaydayItem