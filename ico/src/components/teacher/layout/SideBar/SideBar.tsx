import React, { useState } from 'react'
import { css } from "@emotion/react";
import { useRouter } from 'next/router';
import SideBarLeft from './SideBarLeft'
import SideBarRight from './SideBarRight'
import { MAIN_CLASS, MAIN_GOVERNMENT, MAIN_FINANCE, MAIN_STORE, SUB_CLASS_STUDENTS, SUB_CLASS_EXCHEQUER, SUB_CLASS_OPENING_JOB, SUB_CLASS_COUPON, SUB_GOVERNMENT_CREDIT, SUB_GOVERNMENT_EXCHEQUER, SUB_GOVERNMENT_JOB, SUB_GOVERNMENT_RULE, SUB_FINANCE_DEPOSIT, SUB_FINANCE_STOCK, SUB_STORE_STUDENT, SUB_STORE_TEACHER } from './SideBarIcons';

type SideBarProps = {
  children: any
}

function SideBar({children}: SideBarProps) {
  const [selectedMain, setSelectedMain] = useState<number>(0)
  const [selectedSub, setSelectedSub] = useState<number>(0)
  const router = useRouter();

  const selectMainHandler = (value: number) => {
    setSelectedMain(() => value)
    setSelectedSub(() => 0)
    router.push(SUB_ELEMENT[value][0].url)
  }

  const MAIN_LOGO = <img src={'/assets/icon_desktop.png'} />
  
  const MAIN_ELEMENT: {[prop: number]: {name: string, label:string, content: any}} = {
    0: {name: 'class', label: '우리반', content: MAIN_CLASS},
    1: {name: 'government', label: '정부', content: MAIN_GOVERNMENT},
    2: {name: 'finance', label: '금융', content: MAIN_FINANCE},
    3: {name: 'store', label: '상점', content: MAIN_STORE},
  }

  const SUB_ELEMENT: {
    [prop: number]: {
      name: string, label: string, content: any, url: string
    }[]
  } = {
    0: [
      {name: 'view_students', label: '학생 정보', content: SUB_CLASS_STUDENTS, url: '/teacher/test'},
      {name: 'view_exchequer', label: '국고', content: SUB_CLASS_EXCHEQUER, url: '/teacher/test2'},
      {name: 'view_job_opening', label: '구인 구직', content: SUB_CLASS_OPENING_JOB, url: '/teacher/test'},
      {name: 'view_coupon', label: '쿠폰', content: SUB_CLASS_COUPON, url: '/teacher/test2'},
    ],
    1: [
      {name: 'set_class_rule', label: '학급 규칙', content: SUB_GOVERNMENT_RULE, url: '/teacher/test'},
      {name: 'set_exchequer_rule', label: '세금 관리', content: SUB_GOVERNMENT_EXCHEQUER, url: '/teacher/test2'},
      {name: 'set_job', label: '직업 관리', content: SUB_GOVERNMENT_JOB, url: '/teacher/test'},
      {name: 'set_credit_rating', label: '신용 등급', content: SUB_GOVERNMENT_CREDIT, url: '/teacher/test2'},
    ],
    2: [
      {name: 'set_deposit', label: '예금', content: SUB_FINANCE_DEPOSIT, url: '/teacher/test'},
      {name: 'set_stock', label: '투자', content: SUB_FINANCE_STOCK, url: '/teacher/test2'},
    ],
    3: [
      {name: 'teacher_products', label: '교사 상품', content: SUB_STORE_TEACHER, url: '/teacher/test'},
      {name: 'student_products', label: '학생 상품', content: SUB_STORE_STUDENT, url: '/teacher/test2'},
    ],
  }



  return (
    <div css={layoutWrapperCSS}>
      <div css={sideBarWrapperCSS}>
        <SideBarLeft element={MAIN_ELEMENT} logo={MAIN_LOGO} selectHandler={selectMainHandler} selected={selectedMain}  />
        <SideBarRight element={SUB_ELEMENT[selectedMain]} selectHandler={setSelectedSub} selected={selectedSub} title={MAIN_ELEMENT[selectedMain].label}/>
      </div>
      <div css={contentWrapperCSS}>
        {children}
      </div>
    </div>
  )
}

const layoutWrapperCSS = css`
  width: 100vw;
  height: 100vh;
  display: flex;


`

const sideBarWrapperCSS = css`
  height: 100%;
  width: 360px;
  background-color: red;
  display: flex;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
`

const contentWrapperCSS = css`
  flex: 1;
`

export default SideBar