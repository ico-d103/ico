import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import GovRuleTab from "@/components/student/Gov/Rule/GovRuleTab"

function index() {
	return (
		<>
			<PageHeader title={"학급 규칙"} addComp={<GovRuleTab />} />
		</>
	)
}

export default index
