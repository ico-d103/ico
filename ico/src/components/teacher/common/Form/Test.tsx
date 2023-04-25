import React from "react"

function Test({ subInputChangeHandler }: { subInputChangeHandler?: Function }) {
	return (
		<div>
			<input
				type="text"
				onChange={(event) => {
					subInputChangeHandler && subInputChangeHandler({ key: "test", event })
				}}
			/>
			<input
				type="text"
				onChange={(event) => {
					subInputChangeHandler && subInputChangeHandler({ key: "test2", event })
				}}
			/>
		</div>
	)
}

export default Test
