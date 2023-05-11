import { css } from "@emotion/react"
import PropertyListItem from "./ClassPropertyListItem"
import { getTreasuryHistoryPageType } from "@/types/teacher/apiReturnTypes"

type PropertyListPropsType = {
	propertyList: getTreasuryHistoryPageType[]
}

function PropertyList({ propertyList }: PropertyListPropsType) {
	let prevDate: string | null = null

	return (
		<table css={wrapperCSS}>
			<tbody>
				{propertyList.map((property, idx) => {
					const showDate = property.date !== prevDate
					prevDate = property.date

					return <PropertyListItem key={idx} property={property} showDate={showDate} />
				})}
			</tbody>
		</table>
	)
}

const wrapperCSS = css`
	margin-top: 10px;
`

export default PropertyList
