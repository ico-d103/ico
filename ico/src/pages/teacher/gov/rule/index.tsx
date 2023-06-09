import React, { useEffect } from "react"
import { css } from "@emotion/react"
import GovRuleCredit from "@/components/teacher/Gov/Rule/GovRuleCredit"
import GovRuleClass from "@/components/teacher/Gov/Rule/GovRuleClass"
import LoadImage from "@/components/common/LoadImage/LoadImage"

function index() {
	return (
		<React.Fragment>
			<GovRuleCredit />
			<GovRuleClass />
		</React.Fragment>
	)
}

export async function getServerSideProps() {
	return {
		props: {},
	}
}

export default index
