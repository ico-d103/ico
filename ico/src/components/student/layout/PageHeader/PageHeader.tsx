import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import Portal from "@/components/common/Portal/Portal"
import { useRouter } from "next/router"
import { navTo } from "@/store/store"
import { useAtom } from "jotai"

const backBtn = (
	<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
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

	const renderBtn = (
		<div onClick={goBackHandler} css={goBackCSS}>
			{backBtn}
		</div>
	)

	return (
		<div ref={headerRef} css={headerOuterWrapperCSS({ headerRef })}>
			<div css={headerWrapperCSS({ isScrolled, hasComp: addComp ? true : false })}>
				<div css={headerContentWrapperCSS({ isScrolled, hasComp: addComp ? true : false })}>
					{renderBtn}
					<div css={titleCSS}>{title}</div>

					<div css={whiteSpaceCSS}>{renderBtn}</div>
				</div>
				{addComp}
			</div>
		</div>
	)
}

const headerOuterWrapperCSS = ({ headerRef }: { headerRef: any }) => {
	return css`
		height: ${headerRef.current ? `${headerRef.current.clientHeight}px` : "85px"};
	`
}

const headerWrapperCSS = ({ isScrolled, hasComp }: { isScrolled: boolean; hasComp: boolean }) => {
	return css`
		z-index: 9999999;
		position: fixed;
		width: 100%;

		${isScrolled && "box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2)"};
		/* filter: drop-shadow(0px 0px 10px 1px rgba(0, 0, 0, 0.2)); */
		/* background-color: ${isScrolled ? "rgba(255, 255, 255, 0.5)" : "var(--common-back-color)"}; */
		background-color: var(--common-back-color);
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
		height: ${isScrolled ? (hasComp ? `0px` : "55px") : "85px"};
		transition-property: height;
		transition-duration: 0.3s;
	`
}

const goBackCSS = css`
	cursor: pointer;
`

const titleCSS = css`
	font-size: var(--student-h2);
	font-weight: 700;
`

const whiteSpaceCSS = css`
	visibility: hidden;
`

export default PageHeader
