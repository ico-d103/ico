import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"

type AnimatedRendererProps = {
	compState: boolean
	children: any
}

function AnimatedRenderer({ compState, children }: AnimatedRendererProps) {
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	return (
		<div css={contentWrapperCSS({ compState, contentWrapperRef: contentWrapperRef })}>
			<div ref={contentWrapperRef}>{children}</div>
		</div>
	)
}

const contentWrapperCSS = ({ compState, contentWrapperRef }: { compState: boolean; contentWrapperRef: any }) => {
	return css`
		transition-property: max-height;
		transition-duration: 0.3s;
		max-height: ${compState ? `${contentWrapperRef.current && contentWrapperRef.current.clientHeight}px` : "0px"};
		overflow: hidden;
	`
}

export default AnimatedRenderer
