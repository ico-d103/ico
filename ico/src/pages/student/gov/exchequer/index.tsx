import GovRuleTab from "@/components/student/Gov/Rule/GovRuleTab"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"

function index() {
	return (
		<>
			<PageHeader title={"세금 목록"} addComp={<GovRuleTab />} />
		</>
	)
}

export default index
