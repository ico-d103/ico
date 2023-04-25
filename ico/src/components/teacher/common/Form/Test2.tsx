import React from "react"

function Test2({ inputState }: { inputState?: any }) {
	return <div>{JSON.stringify(inputState)}</div>
}

export default Test2
