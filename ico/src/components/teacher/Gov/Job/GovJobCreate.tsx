import React from 'react'

function GovJobCreate({
	subInputChangeHandler,
	inputState,
	buttons,
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
}) {
    const submit = () => {
		// 제출
	}
	return (
		<React.Fragment>
			<div>

			</div>
			{buttons(submit)}
		</React.Fragment>
	)
}

export default GovJobCreate