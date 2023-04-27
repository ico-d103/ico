import TableGenerator from "../../common/TableGenerator/TableGenerator"
import Button from "@/components/common/Button/Button"

function FinanceDepositTable() {
	const creditRating = [
		["", "1등급", "2등급", "3등급", "4등급", "5등급", "6등급", "7등급", "8등급", "9등급", "10등급"],
		["7일", "15", "12", "10", "8", "6", "5", "4", "3", "0", "0"],
		["21일", "40", "35", "30", "26", "22", "19", "16", "13", "10", "10"],
	]

	const editDepositTable = () => {
		console.log("editDepositTable")
	}

	return (
		<>
			<TableGenerator table={creditRating} perHeight={"48px"} />
			<Button
				text={"수정하기"}
				fontSize={`var(--teacher-h4)`}
				width={"190px"}
				theme={"normal"}
				onClick={editDepositTable}
			/>
		</>
	)
}

export default FinanceDepositTable
