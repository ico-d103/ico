import React from "react"

type GovCorporateListProps = {
	corporate: {
		id: number
		logo: string
		name: string
		type: string
		ceo: string
		content: string
		firstMoney: number
		registNumber: string
	}
}

function GovCorporateList({ corporate }: GovCorporateListProps) {
	return <div>GovCorporateList</div>
}

export default GovCorporateList
