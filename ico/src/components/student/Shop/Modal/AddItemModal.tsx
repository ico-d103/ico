import React, {useState} from 'react'
import { css } from "@emotion/react"
import { UseQueryResult } from '@tanstack/react-query'
import { getTeacherProductDetailType } from '@/types/teacher/apiReturnTypes'
import Button from '@/components/common/Button/Button'
import useShopHandler from '../useShopHandler'
import useNotification from '@/hooks/useNotification'
import NotiTemplate from '@/components/common/StackNotification/NotiTemplate'

type AddItemModalPropsType = {
  query: UseQueryResult<getTeacherProductDetailType, unknown>
  closeHandler: () => void
}

function AddItemModal({query, closeHandler}: AddItemModalPropsType) {
  const {data, isSuccess} = query
  const [count, setCount] = useState(1)
  const noti = useNotification()
  const shopHandler = useShopHandler()

  const countHandler = (reverse = false) => {
    if (!isSuccess) return
    if (reverse) {
      if (count > 1) {
        setCount((prev) => prev - 1)
      } else {
        noti({content: <NotiTemplate type={'alert'} content={"최소 한개 이상은 구매해야 해요!"}/>, duration: 5000, id: 'addItemAlertMinus'})
      }
    } else {
      if (count < data.count - data.sold) {
        setCount((prev) => prev + 1)
      } else {
        noti({content: <NotiTemplate type={'alert'} content={"상품의 개수를 초과하였어요!"}/>, duration: 5000, id: 'addItemAlertPlus'})
      }
    }
  }

  const submitHandler = () => {
    if (!isSuccess) return
    shopHandler.addProducts({seller: data.seller, id: data.id, count: count, title: data.title, amount: data.amount, image: data.images[0] })
    noti({content: <NotiTemplate type={'ok'} content={"장바구니에 상품을 추가했어요!"}/>, duration: 5000})
    closeHandler()
  }

  return (
    <div css={wrapperCSS}>
      <div css={bodyWrapperCSS}>
        <div css={adjButtonCSS} onClick={countHandler.bind(null, true)}>
          -
        </div>
        <div css={countWrapperCSS}>
          {count}
        </div>
        <div css={adjButtonCSS} onClick={countHandler.bind(null, false)}>
          +
        </div>
        
      </div>

      <div css={buttonWrapperCSS}>
      <Button
						text={"취소"}
						fontSize={`var(--student-h3)`}
						width={"47%"}
						theme={"mobileCancel"}
						onClick={closeHandler}
					/>
      <Button
						text={"장바구니 추가"}
						fontSize={`var(--student-h3)`}
						width={"47%"}
						theme={"mobileSoft"}
						onClick={submitHandler}
					/>
      </div>
      
    </div>
  )
}

const wrapperCSS = css`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

const bodyWrapperCSS = css`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const buttonWrapperCSS = css`
  display: flex;
  width: 100%;
  justify-content: space-between;

`

const countWrapperCSS = css`
  width: 48px;
  text-align: center;

`

const adjButtonCSS = css`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-color: var(--student-main-color);
  cursor: pointer;
  user-select: none;
  transition-property: background-color;
  transition-duration: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--student-main-color-2);;
  }
`

export default AddItemModal