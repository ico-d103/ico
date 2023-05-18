import PageHeader from '@/components/student/layout/PageHeader/PageHeader'
import React from 'react'
import { css } from "@emotion/react"
import UseAnimations from "react-useanimations";
import radioButton from 'react-useanimations/lib/radioButton';
import Button from '@/components/common/Button/Button';

function purchased() {
  return (
    <React.Fragment>
        <PageHeader title={"결제 완료"} />
        <div css={wrapperCSS}>
            <div css={topContentWrapperCSS}>
                <UseAnimations animation={radioButton} reverse={true} size={48} css={css`margin: 0px 16px 0px 0px;`} />
                결제가 완료되었습니다!
            </div>
            <div>
                <Button text={"확인"} fontSize={"var(--student-h3)"} width={"40%"} theme={"mobileSoft2"} onClick={() => {}} />
            </div>
        </div>
        
    </React.Fragment>
  )
}

const wrapperCSS = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const topContentWrapperCSS = css`
    width: 100%;
    flex: 1;   

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default purchased