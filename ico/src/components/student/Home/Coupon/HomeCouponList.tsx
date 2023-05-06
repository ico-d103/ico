import React from "react"
import HomeCouponListItem from "./HomeCouponListItem"

const couponList = [
	{ title: "급식충 진화", quantity: 3, hasSent: true },
	{ title: "이빨 강화", quantity: 2, hasSent: false },
]
function HomeCouponList() {
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
