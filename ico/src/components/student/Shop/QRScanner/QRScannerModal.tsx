import Button from '@/components/common/Button/Button'
import React from 'react'
import QRScanner from './QRScanner'
import { css } from "@emotion/react"

function QRScannerModal({closeComp}: {closeComp?: Function}) {
  return (
    <div css={wrapperCSS}>
        <QRScanner />
        <div css={buttonWrapperCSS}>
        <Button text={"취소"} fontSize={"var(--student-h3)"} width={"40%"} theme={"mobileCancel"} onClick={() => {closeComp && closeComp()}} />
        </div>
        
    </div>
  )
}

const wrapperCSS = css`
  width: 90vw;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
  overflow: hidden;
`

const buttonWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`

export default QRScannerModal