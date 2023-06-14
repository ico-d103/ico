import { useState, useRef, useEffect } from "react"
import { css } from "@emotion/react"
import { useSetAtom } from "jotai"
import { selectedStudent } from "@/store/store"

type CollapseMenuStudentDetailPropsType = {
	studentId: number
	titleChildren: JSX.Element
	contentChildren: JSX.Element
	reverse?: boolean
}

function CollapseMenuStudentDetail({
	studentId,
	titleChildren,
	contentChildren,
	reverse,
}: CollapseMenuStudentDetailPropsType) {
	const [isOpened, setIsOpened] = useState<boolean>(reverse ? true : false)
	const [refresh, setRefresh] = useState<boolean>(false)
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	const setSelectedStudentAtom = useSetAtom(selectedStudent)

	useEffect(() => {
		if (isOpened) {
			setSelectedStudentAtom(studentId)
		}

		setTimeout(() => {
			setRefresh((prev) => !prev)
		}, 400)
	}, [isOpened])

	return (
		<div css={ancWrapperCSS}>
			<div
				css={trgWrapperCSS}
				onClick={() => {
					setIsOpened((prev) => !prev)
				}}
			>
				{titleChildren}
				<img css={bracketImgCSS({ isOpened })} src={"/assets/bracket.png"} />
			</div>

			<div css={contentWrapperCSS({ isOpened, contentWrapperRef })}>
				<div ref={contentWrapperRef}>
					<div css={spaceCSS} />
					{contentChildren}
					{refresh && <div />}
				</div>
			</div>
		</div>
	)
}

const ancWrapperCSS = css`
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	box-sizing: border-box;
	border: none;
`

const trgWrapperCSS = css`
	user-select: none;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	line-height: 20px;
`

const bracketImgCSS = ({ isOpened }: { isOpened: boolean }) => {
	return css`
		transition-property: transform;
		transition-duration: 0.4s;
		width: auto;
		height: 10px;
		transform: ${isOpened && "rotate( 180deg )"};
		margin-left: 10px;
	`
}

const spaceCSS = css`
	height: 15px;
`

const contentWrapperCSS = ({ isOpened, contentWrapperRef }: { isOpened: boolean; contentWrapperRef: any }) => {
	return css`
		transition-property: max-height;
		transition-duration: 0.4s;
		overflow: hidden;
		max-height: ${isOpened ? `${contentWrapperRef.current && contentWrapperRef.current.clientHeight + 1}px` : "0px"};
		line-height: 20px;
	`
}

export default CollapseMenuStudentDetail
