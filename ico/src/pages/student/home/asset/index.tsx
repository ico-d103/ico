import React from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import ContentWrapper from "@/components/student/common/ContentWrapper/ContentWrapper"
import HomeAssetDetail from "@/components/student/Home/AssetDetail/HomeAssetDetail"
import { css } from "@emotion/react"

function asset() {
	return (
		<div>
			<PageHeader title={"자산"} />
			<div css={assetWrapperCSS}>
				<ContentWrapper>
                    <div css={sSizeFontCSS}>
                        일반 계좌
                    </div>
                    <div css={lSizeFontCSS}>
                        253,015 미소
                    </div>
                </ContentWrapper>
				<ContentWrapper>
                    <HomeAssetDetail />
                </ContentWrapper>
			</div>
		</div>
	)
}

const assetWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const lSizeFontCSS = css`
    font-size: var(--student-h1);
    font-weight: 700;
    line-height: 150%;

`

const sSizeFontCSS = css`
    font-size: var(--student-h4);
    color: rgba(0, 0, 0, 0.6);
`

export default asset
