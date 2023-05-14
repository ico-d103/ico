import React, { useEffect } from 'react'
import { css } from "@emotion/react"
import HomeGradationButton from './HomeGradationButton'
import LoadImage from '@/components/common/LoadImage/LoadImage'
import useNavigate from '@/hooks/useNavigate'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useGetNation from '@/hooks/useGetNation'
import { appendEiGa } from '@/util/isEndWithConsonant'


function HomeButtonSection() {
    const navigate = useNavigate()
    const [nation] = useGetNation()


    
  return (
    <div css={buttonSectionWrapperCSS}>
        <div css={columnCSS}>
            <HomeGradationButton cssProps={css`width: 42%; height: 140px;`} backgroundColor={['#e0c3fc', '#8ec5fc']} onClick={() => {navigate('/student/home/coupon', 'bottomToTop')}}>
            
                <div css={lsizeFontCSS}>
                    쿠폰을 써보아요.
                </div>
                <div css={[imageWrapperCSS, css`margin-top: -12px; margin-left: 8px;`]}>
                    <LoadImage src={'/assets/home/coupon.png'} alt={'coupon'} wrapperCss={css`width: 120px; height: 120px;`} />
                </div>
                

                
            </HomeGradationButton>
            <HomeGradationButton cssProps={css`width: 54%; height: 140px;`} backgroundColor={['#a18cd1', '#fbc2eb']} onClick={() => {navigate('/student/home/exchequer', 'bottomToTop')}}>
                <div css={msizeFontCSS}>
                    우리나라의 국고에
                </div>
                <div css={lsizeFontCSS}>
                    {nation.treasury} {appendEiGa(nation.currency)}
                </div>
                <div css={msizeFontCSS}>
                    남아있어요!
                </div>
                <div css={[imageWrapperCSS, css`margin-top: -24px;`]}>
                    <LoadImage src={'/assets/home/exchequer.png'} alt={'exchequer'} wrapperCss={css`width: 120px; height: 80px;`}/>
                </div>
            </HomeGradationButton>
        </div>
        <div css={columnCSS}>
            <HomeGradationButton cssProps={css`width: 54%; height: 140px;`} backgroundColor={['#fa709a', '#fee140']} onClick={() => {navigate('/student/finance/deposit', 'bottomToTop')}}>
                <div css={lsizeFontCSS}>
                    예금하러 가요!
                </div>
                <div css={[imageWrapperCSS, css`margin-top: 10px;`]}>
                    <LoadImage src={'/assets/home/deposit.png'} alt={'exchequer'} wrapperCss={css`width: 120px; height: 80px;`} />
                </div>
            </HomeGradationButton>
            <HomeGradationButton cssProps={css`width: 42%; height: 140px;`} backgroundColor={['#84fab0', '#8fd3f4']} onClick={() => {navigate('/student/finance/invest', 'bottomToTop')}}>
                <div css={lsizeFontCSS}>
                    실전형 투자 체험
                </div>
                <div css={[imageWrapperCSS, css`margin-top: 15px;`]}>
                    <LoadImage src={'/assets/home/stock.png'} alt={'exchequer'} wrapperCss={css`width: 120px; height: 77px;`} />
                </div>
            </HomeGradationButton>
        </div>
        
    </div>
  )
}

const buttonSectionWrapperCSS = css`
    width: 95%;
    
`

const columnCSS = css`
    display: flex;
    justify-content: space-between;
`

const lsizeFontCSS = css`
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 4px;
`

const msizeFontCSS = css`
    font-size: var(--student-h4);
    font-weight: 700;
    margin-bottom: 4px;
`

const imageWrapperCSS = css`
    width: 100%;
    display: flex;
    justify-content: end;
`
export default HomeButtonSection