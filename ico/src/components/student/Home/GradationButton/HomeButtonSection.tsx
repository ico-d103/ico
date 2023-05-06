import React from 'react'
import { css } from "@emotion/react"
import HomeGradationButton from './HomeGradationButton'
import LoadImage from '@/components/common/LoadImage/LoadImage'
import useNavigate from '@/hooks/useNavigate'

function HomeButtonSection() {
    const navigate = useNavigate()
    
  return (
    <div css={buttonSectionWrapperCSS}>
        <div css={columnCSS}>
            <HomeGradationButton cssProps={css`width: 42%; height: 140px;`} backgroundColor={['#459BFF', '#001AFF']} onClick={() => {navigate('/student/home/coupon', 'bottomToTop')}}>
            
                <div css={lsizeFontCSS}>
                    쿠폰을 써보아요.
                </div>
                <div css={[imageWrapperCSS, css`margin-top: -12px; margin-left: 8px;`]}>
                    <LoadImage src={'/assets/home/coupon.png'} alt={'coupon'} wrapperCss={css`width: 120px; height: 120px;`} />
                </div>
                

                
            </HomeGradationButton>
            <HomeGradationButton cssProps={css`width: 54%; height: 140px;`} backgroundColor={['#91FF75', '#00A3FF']} onClick={() => {navigate('/student/home/exchequer', 'bottomToTop')}}>
                <div css={msizeFontCSS}>
                    우리나라의 국고에
                </div>
                <div css={lsizeFontCSS}>
                    121,05,123Ruble이
                </div>
                <div css={msizeFontCSS}>
                    남아있어요!
                </div>
                <div css={[imageWrapperCSS, css`margin-top: -34px;`]}>
                    <LoadImage src={'/assets/home/exchequer.png'} alt={'exchequer'} wrapperCss={css`width: 120px; height: 120px;`} />
                </div>
            </HomeGradationButton>
        </div>
        <div css={columnCSS}>
            <HomeGradationButton cssProps={css`width: 54%; height: 140px;`} backgroundColor={['#A175FF', '#5200FF']} onClick={() => {navigate('/student/finance/guide', 'rightToLeft')}}>
                <div css={lsizeFontCSS}>
                    예금하러 가요!
                </div>
                <div css={[imageWrapperCSS, css`margin-top: -14px;`]}>
                    <LoadImage src={'/assets/home/deposit.png'} alt={'exchequer'} wrapperCss={css`width: 120px; height: 120px;`} />
                </div>
            </HomeGradationButton>
            <HomeGradationButton cssProps={css`width: 42%; height: 140px;`} backgroundColor={['#FF4567', '#BD00FF']}>
                <div css={lsizeFontCSS}>
                    실전형 투자 체험
                </div>
                <div css={[imageWrapperCSS, css`margin-top: -14px;`]}>
                    <LoadImage src={'/assets/home/stock.png'} alt={'exchequer'} wrapperCss={css`width: 120px; height: 120px;`} />
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