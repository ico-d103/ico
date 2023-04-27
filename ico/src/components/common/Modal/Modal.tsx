import React, { useState, useEffect } from "react"
import Portal from "../Portal/Portal"
import { css } from "@emotion/react"

// transition : 아래 transitions css의 객체에 키값을 참조할 것. 0426 기준 fadeIn, scale, rightToLeft, bottomToTop, flip 사용 가능
// content: 모달로 띄우고자 하는 컴포넌트 - 자동으로 props에 모달창을 끄는 closeComp 함수를 컴포넌트의 props로 넘겨주기 때문에 해당 컴포넌트의 props에 closeComp를 선언, 타입은 closeComp?: () => void로 사용하면 된다.
// compState, closeComp : useCompHandler의 함수와 상태

type ModalProps = {
	compState: boolean
	closeComp: () => void
	transition: string
	content: JSX.Element
}

function Modal({ compState, closeComp, transition, content }: ModalProps) {
	const [modalState, setModalState] = useState<boolean>(false)

	useEffect(() => {
		if (compState) {
			setTimeout(() => {
				setModalState(() => true)
			}, 30)
		} else {
			setTimeout(() => {
				setModalState(() => false)
			}, 300)
		}
	}, [compState])

	const renderContent = React.cloneElement(content, {
		closeComp,
	})

	if (modalState || compState) {
		return (
			<Portal>
				<div css={modalWrapperCSS}>
					<div css={backdropCSS({ compState, modalState })} onClick={closeComp} />
					<div css={transitions({ compState, modalState })[transition]}>
						<div className={"inner-wrapper"} css={innerWrapperCSS}>
							{renderContent}
						</div>
					</div>
				</div>
			</Portal>
		)
	} else {
		return <React.Fragment />
	}
}

const backdropCSS = ({ compState, modalState }: { compState: boolean; modalState: boolean }) => {
	return css`
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		opacity: ${compState ? (modalState ? "100%" : "0%") : "0%"};
		transition-duration: 0.3s;
		transition-property: opacity;
	`
}

const modalWrapperCSS = css`
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 10000;
	display: flex;
	justify-content: center;
	align-items: center;
`

const transitions = ({ compState, modalState }: { compState: boolean; modalState: boolean }) => {
	const data: { [prop: string]: any } = {
		fadeIn: css`
			position: relative;
			transition-duration: 0.3s;
			transition-property: opacity;
			opacity: ${compState ? (modalState ? "100%" : "0%") : "0%"};
		`,
		scale: css`
			position: relative;
			transition-duration: 0.3s;
			transition-property: opacity transform;
			opacity: ${compState ? (modalState ? "100%" : "0%") : "0%"};
			transform: ${compState ? (modalState ? "scale(1)" : "scale(1.1)") : "scale(1.1)"};
		`,
		rightToLeft: css`
			position: relative;
			transition-duration: 0.3s;
			transition-property: left;
			left: ${compState ? (modalState ? "0" : "100%") : "100%"};
		`,
		bottomToTop: css`
			position: relative;
			transition-duration: 0.3s;
			transition-property: top;
			top: ${compState ? (modalState ? "0" : "100%") : "100%"};
		`,
		flip: css`
			transition-duration: 0.3s;
			transition-property: top;
			position: relative;
			perspective: 500px;
			top: ${compState ? (modalState ? "0" : "5%") : "5%"};

			& .inner-wrapper {
				transition-duration: 0.3s;
				transition-property: transform opacity;
				backface-visibility: hidden;
				/* transition: 1s; */
				transform: ${compState ? (modalState ? "rotateX(0deg)" : "rotateX(60deg)") : "rotateX(60deg)"};
				opacity: ${compState ? (modalState ? "100%" : "0%") : "0%"};
			}
		`,
	}

	return data
}

const innerWrapperCSS = css`
	width: 100%;
	height: 100%;
`

export default Modal
