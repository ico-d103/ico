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
	const [contentHeight, setContentHeight] = useState<number>(0)

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

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
		  for (let entry of entries) {
			// entry.contentRect.height는 요소의 높이를 나타냅니다.
			console.log(entry.contentRect.height);
			setContentHeight(() => entry.contentRect.height)
		  }
		});
	
		if (contentWrapperRef.current) {
		  resizeObserver.observe(contentWrapperRef.current);
		}
	
		return () => {
		  resizeObserver.disconnect();
		};
	  }, []);
	
	return (
		<div css={contentWrapperCSS({ initHeight, sectionState, compState, contentHeight, contentWrapperRef: contentWrapperRef })}>
			<div ref={contentWrapperRef}>{children}</div>
		</div>
	)
}

const contentWrapperCSS = ({ initHeight, sectionState, compState, contentHeight, contentWrapperRef }: { initHeight?: string; sectionState: boolean; compState: boolean; contentHeight: number; contentWrapperRef: any }) => {
	return css`
		margin-top: 16px;
		transition-property: max-height opacity;
		transition-duration: 0.3s;
		max-height: ${compState ? `${contentHeight}px` : `${initHeight ? initHeight : '0px'}`};
		overflow: ${compState ? (sectionState ? "visible" : "hidden") : "hidden"};
		opacity: ${compState ? '100%' : "0%"};
		border-radius: 10px;
	`
}

export default AnimatedRenderer
