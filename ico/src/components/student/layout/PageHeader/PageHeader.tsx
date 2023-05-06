import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import Portal from "@/components/common/Portal/Portal"
import { useRouter } from "next/router"
import { navTo } from "@/store/store"
import { useAtom } from "jotai"

const backBtn = (
	<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M13.0892 3.57757C13.4146 3.90301 13.4146 4.43065 13.0892 4.75609L7.8451 10.0002L13.0892 15.2442C13.4146 15.5697 13.4146 16.0973 13.0892 16.4228C12.7637 16.7482 12.2361 16.7482 11.9107 16.4228L6.07733 10.5894C5.75189 10.264 5.75189 9.73634 6.07733 9.41091L11.9107 3.57757C12.2361 3.25214 12.7637 3.25214 13.0892 3.57757Z"
			fill="black"
		/>
	</svg>
)

type PageHeaderProps = {
	title: string
	addComp?: any
}

function PageHeader({ title, addComp }: PageHeaderProps) {
	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const headerRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const [navToAtom, setNavToAtom] = useAtom(navTo)
	const [compHeight, setCompHeight] = useState<number>(0)

	const handleScroll = (event: any) => {
		if (window.scrollY === 0) {
			setIsScrolled(() => false)
		} else {
			setIsScrolled(() => true)
		}
	}

	const goBackHandler = () => {
		router.back()
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { capture: true }) // 스크롤 이벤트 등록
		return () => {
			window.removeEventListener("scroll", handleScroll) // 스크롤 이벤트 제거
		}
	}, [])

	useEffect(() => {
		if (headerRef.current) {
			const height = headerRef.current.clientHeight
			setCompHeight(() => height)
		}
	}, [headerRef.current])

	const renderBtn = (
		<div onClick={goBackHandler} css={goBackCSS}>
			{backBtn}
		</div>
	)

	return (
		<div css={headerOuterWrapperCSS({ compHeight, hasComp: addComp ? true : false  })}>
			<div css={headerWrapperCSS({ isScrolled, hasComp: addComp ? true : false })}>
				<div css={headerContentWrapperCSS({ isScrolled, hasComp: addComp ? true : false })}>
					{renderBtn}
					<div css={titleCSS({ isScrolled })}>{title}</div>

					<div css={whiteSpaceCSS}>{renderBtn}</div>
				</div>
				<div ref={headerRef}>{addComp}</div>
			</div>
		</div>
	)
}

const headerOuterWrapperCSS = ({ compHeight, hasComp }: { compHeight: number, hasComp: boolean }) => {
	return css`
		height: ${compHeight + 70}px;
		margin-bottom: ${hasComp && '30px'};
		/* margin-bottom: 16px; */
	`
}

const headerWrapperCSS = ({ isScrolled, hasComp }: { isScrolled: boolean; hasComp: boolean }) => {
	return css`
		z-index: 9000;
		position: fixed;
		width: 100%;
		top: ${isScrolled && hasComp ? `-55px` : "0px"};
		${isScrolled
			? "box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.1)"
			: hasComp
			? "box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.1)"
			: null};
		border-bottom: ${isScrolled && '2px solid #ff9d0058'};

		/* filter: drop-shadow(0px 0px 10px 1px rgba(0, 0, 0, 0.2)); */
		/* background-color: ${isScrolled ? "rgba(255, 255, 255, 0.5)" : "var(--common-back-color)"}; */
		background-color: ${isScrolled ? '#ffebaa' : (hasComp ? '#ffebaa' : 'var(--student-main-color)')};
		/* filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2)); */
		transition-property: box-shadow background-color;
		transition-duration: 0.3s;
		/* backdrop-filter: blur(30px); */
	`
}

const headerContentWrapperCSS = ({ isScrolled, hasComp }: { isScrolled: boolean; hasComp: boolean }) => {
	return css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px;
		height: ${isScrolled ? "55px" : "70px"};

		transition-property: height;
		transition-duration: 0.3s;
	`
}

const goBackCSS = css`
	cursor: pointer;
`

const titleCSS = ({ isScrolled }: { isScrolled: boolean }) => {
	return css`
		transition-property: font-size;
		transition-duration: 0.3s;
		font-size: ${isScrolled ? "var(--student-h2)" : "22px"};
		font-weight: 700;
	`
}

const whiteSpaceCSS = css`
	visibility: hidden;
`

export default PageHeader
