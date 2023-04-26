import Form from "@/components/teacher/common/Form/Form"
import Test from "@/components/teacher/common/Form/Test"

function InvestForm() {
	return (
		<>
			<Form
				mainInit={{ title: "zzzz", content: "hahaha" }}
				subInit={{ test: "", test2: "" }}
				subInput={<Test />}
				idx={3}
				titlePlaceHolder={"제목을 입력해 주세요!"}
				contentPlaceHolder={"내용을 입력해 주세요!"}
				frontComp={<Test />}
			/>
		</>
	)
}

export default InvestForm
