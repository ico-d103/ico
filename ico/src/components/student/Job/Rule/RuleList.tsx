import { getGovRuleType } from "@/types/teacher/apiReturnTypes"
import React from "react"
import RuleListItem from "./RuleListItem"
import { css } from "@emotion/react"

type ruleProps = {
	rules: getGovRuleType[]
}

function RuleList({ rules }: ruleProps) {
	const renderRules = rules.map((el) => {
		return <RuleListItem key={el.id} rule={el} />
	})

	return <React.Fragment>{renderRules}</React.Fragment>
}

export default RuleList
