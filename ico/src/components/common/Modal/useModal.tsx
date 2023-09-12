import React, { useState, useEffect, ReactNode, ReactElement, JSXElementConstructor, useCallback, useMemo } from "react"
import Portal from "../Portal/Portal"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { modalHandler } from "@/store/store"



type ModalPropsType = {
	transition: any
	compState: boolean
	closeHandler: () => void
	content: ReactNode
}


function useModal(transition: transitionsKeyType = 'scale') {
	const [modalState, setModalState] = useState(false)

	const modal = (content: ReactNode): any => {
		if (content) {
			return ModalBridge.bind(null, {transition, compState: modalState, closeHandler: setModalState.bind(null, () => false), content})()
		}
		
	}
	
	modal.open = setModalState.bind(null, () => true)
	modal.close = setModalState.bind(null, () => false)
	modal.state = modalState



	return modal

	

	
}


function ModalBridge(props: ModalPropsType) {
	return <Modal {...props}/>
}




function Modal({transition, compState , closeHandler, content}: ModalPropsType  ) {

	const [modalState, setModalState] = useState<boolean>(false)
	const [modalHandlerAtom, setModalHandlerAtom] = useAtom(modalHandler)
	const router = useRouter()

	useEffect(() => {
		if (compState) {
			setTimeout(() => {
				setModalHandlerAtom(() => closeHandler)
				setModalState(() => true)
			}, 30)
		} else {
			setTimeout(() => {
				setModalState(() => false)
				setModalHandlerAtom(() => null)
			}, 300)
		}
	}, [compState])



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

	const renderContent = React.cloneElement(content as ReactElement<any, string | JSXElementConstructor<any>>, {
		closeComp: closeHandler,
	})


	if (modalState || compState) {
		return (
			<Portal>
				<div css={modalWrapperCSS}>
					<div css={backdropCSS({ compState, modalState })} onClick={closeHandler} />
					<div css={transitions({ compState, modalState })[transition]} onClick={closeHandler}>
						<div className={"inner-wrapper"} css={innerWrapperCSS} onClick={(e) => e.stopPropagation()}>
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
		width: 100vw;
		height: 100vh;
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
	z-index: 199999999;
	display: flex;
	justify-content: center;
	align-items: center;
`

type transitionsKeyType = 'fadeIn' | 'scale' | 'rightToLeft' | 'bottomToTop' | 'flip'

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


export default useModal