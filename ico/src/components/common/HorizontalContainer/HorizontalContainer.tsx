import { useState, useEffect, useRef, ReactNode, Children, ReactElement } from "react"
import { css } from "@emotion/react"
import { postImmigrationAPI } from "@/api/student/user/postImmigrationAPI"
import { useRouter } from "next/router"

import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"
import { ENG_NUM_ONLY } from "@/util/regex"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import { removeCookie } from "@/api/cookie"

type HorizontalContainerPropsType = {
  children: ReactNode
  phase: number
}

function HorizontalContainer({children, phase}: HorizontalContainerPropsType) {
  const itemsArray = Children.toArray(children) as Array<ReactElement<HorizontalContainerStepPropsType>>;
  const renderItems = itemsArray.filter((step) => step.type === HorizontalContainer.Step)

	return (
		<div css={wrapperCSS}>
			<div css={gridCSS({ phase })}>
        {renderItems}
			</div>
		</div>
	)
}

type HorizontalContainerStepPropsType = {
  children: ReactNode
}

HorizontalContainer.Step = ({children}: HorizontalContainerStepPropsType) => {
  return (
    <div css={phaseWrapperCSS}>
			{children}
		</div>
  )
}

const wrapperCSS = css`
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: grid;
	
`

const gridCSS = ({ phase }: { phase: number }) => {
	return css`
		
		min-height: 100%;
		display: grid;
		grid-template-columns: 100vw 100vw;
		grid-template-rows: 100%;
		transition-property: transform;
		transition-duration: 0.5s;
		
		transform: translate(calc(-${phase} * 100vw), 0px);
		transition-timing-function: cubic-bezier(0.5, 0.2, 0.1, 0.8);
		/* overflow: hidden; */
	`
}

const phaseWrapperCSS = css`
	max-width: 100vw;
	width: 100vw;
	height: 100%;

	overflow: hidden;
`

export default HorizontalContainer
