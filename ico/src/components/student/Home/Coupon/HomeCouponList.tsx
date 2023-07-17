import React from "react"
import HomeCouponListItem from "./HomeCouponListItem"
import { getHomeCouponType } from "@/types/student/apiReturnTypes"
import UseAnimations from "react-useanimations"
import alertCircle from "react-useanimations/lib/alertCircle"
import { css } from "@emotion/react"
import { useAtom } from "jotai"
import { isNavigating } from "@/store/store"
import useMediaQuery from "@/hooks/useMediaQuery"


const dummy = [
	{id: 0,
		title: 'string',
		count: 1,
		assigned: false},
		{id: 1,
			title: 'string',
			count: 1,
			assigned: false},
			{id: 2,
				title: 'string',
				count: 1,
				assigned: false},
				{id: 3,
					title: 'string',
					count: 1,
					assigned: false},
					{id: 4,
						title: 'string',
						count: 1,
						assigned: false},

]


type HomeCouponListProps = {
    couponList : getHomeCouponType[]
}



function HomeCouponList({couponList}: HomeCouponListProps) {
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
	const isMobile = useMediaQuery("(max-width: 420px")
    const renderList = couponList.map((el) => {
        return <HomeCouponListItem {...el} />
    })

	return (
    <div css={wrapperCSS({ isMobile })}>
        {couponList.length === 0 ? (
				<div css={alertWrapperCSS}>
					<div css={css`width: 128px; height: 128px;`}>
						{isNavigatingAtom === false && <UseAnimations animation={alertCircle} size={128} />}
					</div>
					
					<div css={labelCSS}>쿠폰이 없어요!</div>
				</div>
			) : (
				renderList
			)}
  
    </div>
        )
}

const labelCSS = css`
	margin-top: 12px;
	font-size: 24px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.6);
`

const alertWrapperCSS = css`
	width: 100%;
	height: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
	
`

const wrapperCSS = ({isMobile}: {isMobile: boolean | null}) => {
	return css`
	/* flex: 1;  */
	/* display: flex; */
	/* flex-direction: column; */
	/* margin-top: ${isMobile ? "0px" : "16px"}; */
		/* place-items: center; */

	display: grid;
	grid-template-columns: ${isMobile ? 'repeat(auto-fill, minmax(45vw, 1fr))' : 'repeat(auto-fill, minmax(260px, 1fr))'};
	grid-row-gap: ${isMobile ? '16px' : '32px'};
	grid-column-gap: 32px;
`
}

export default HomeCouponList
