import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"

type AnimatedRendererProps = {
	compState: boolean
	children: any
	initHeight?: string
}

function AnimatedRenderer({ compState, children, initHeight }: AnimatedRendererProps) {
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
		<div css={contentWrapperCSS({ initHeight, sectionState, compState, contentWrapperRef: contentWrapperRef })}>
			<div ref={contentWrapperRef}>{children}</div>
		</div>
	)
}

const contentWrapperCSS = ({ initHeight, sectionState, compState, contentWrapperRef }: { initHeight?: string; sectionState: boolean; compState: boolean; contentWrapperRef: any }) => {
	return css`
		margin-top: 16px;
		transition-property: max-height opacity;
		transition-duration: 0.3s;
		max-height: ${compState ? `${contentWrapperRef.current && contentWrapperRef.current.clientHeight}px` : `${initHeight ? initHeight : '0px'}`};
		overflow: ${compState ? (sectionState ? "visible" : "hidden") : "hidden"};
		opacity: ${compState ? '100%' : "0%"};
	`
}

export default AnimatedRenderer
