import React from "react"
import HomeCouponListItem from "./HomeCouponListItem"
import { getHomeCouponType } from "@/types/student/apiReturnTypes"



type HomeCouponListProps = {
    couponList : getHomeCouponType[]
}

function HomeCouponList({couponList}: HomeCouponListProps) {
    const renderList = couponList.map((el) => {
        return <HomeCouponListItem {...el} />
    })

	return (
    <div>
        {renderList}
    </div>
        )
}

export default HomeCouponList
