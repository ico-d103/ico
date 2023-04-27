import React from "react"
import { css } from "@emotion/react"

type StudentEnteredListItemPropsType = {
	mock: {
		id: number
		number: number
		name: string
		job: string
		grade: number
		money: number
	}
}

function StudentEnteredListItem({ mock }: StudentEnteredListItemPropsType) {
	return <div></div>
}

export default StudentEnteredListItem
