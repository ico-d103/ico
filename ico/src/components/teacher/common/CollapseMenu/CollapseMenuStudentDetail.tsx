import { useState, useRef, useEffect } from "react"
import { css } from "@emotion/react"
import { useAtom } from "jotai"
import { selectedStudent } from "@/store/store"

type CollapseMenuStudentDetailPropsType = {
	studentId: number
	titleChildren: JSX.Element
	contentChildren: JSX.Element | null
}

function CollapseMenuStudentDetail({ studentId, titleChildren, contentChildren }: CollapseMenuStudentDetailPropsType) {
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const [refresh, setRefresh] = useState<boolean>(false)
	const contentWrapperRef = useRef<HTMLDivElement>(null)
	const [selectedStudentAtom, setSelectedStudentAtom] = useAtom(selectedStudent)

	const selectStudentHandler = () => {
		setIsOpened(!isOpened)
		setSelectedStudentAtom(studentId)
	}

	useEffect(() => {
		if (selectedStudentAtom !== studentId) {
			setIsOpened(false)
		} else {
			setIsOpened(true)
		}
	}, [selectedStudentAtom])

	useEffect(() => {
		// 스크롤 위치 맞춰주기 위함
		setTimeout(() => {
			setRefresh(!refresh)
		}, 200)
	}, [isOpened])

	return (
		<div css={ancWrapperCSS}>
			<div css={trgWrapperCSS} onClick={selectStudentHandler}>
				{titleChildren}
			</div>

			<div css={contentWrapperCSS({ isOpened, contentWrapperRef })}>
				<div ref={contentWrapperRef}>
					{contentChildren && (
						<>
							<div css={spaceCSS} />
							{contentChildren}
							{refresh && <div />}
						</>
					)}
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
