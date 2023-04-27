import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"

type AnimatedRendererProps = {
	compState: boolean
	children: any
}

function AnimatedRenderer({ compState, children }: AnimatedRendererProps) {
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState<boolean>(false)

	useEffect(() => {
		if (compState) {
			setTimeout(() => {
				setSectionState(() => true)
			}, 300)
		} else {
			setTimeout(() => {
				setSectionState(() => false)
			}, 300)
		}
	}, [compState])
	
	return (
		<div css={contentWrapperCSS({ sectionState, compState, contentWrapperRef: contentWrapperRef })}>
			<div ref={contentWrapperRef}>{children}</div>
		</div>
	)
}

const contentWrapperCSS = ({ sectionState, compState, contentWrapperRef }: { sectionState: boolean; compState: boolean; contentWrapperRef: any }) => {
	return css`
		transition-property: max-height;
		transition-duration: 0.3s;
		max-height: ${compState ? `${contentWrapperRef.current && contentWrapperRef.current.clientHeight}px` : "0px"};
		overflow: ${compState ? (sectionState ? "visible" : "hidden") : "hidden"};
	`
}

export default AnimatedRenderer
