import { css } from "@emotion/react"
import { MAIN_SETTING, MAIN_SIGNOUT } from "./SideBarIcons"
import { removeCookie } from "@/api/cookie"
import { useRouter } from "next/router"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"

type SideBarLeftProps = {
	element: { [prop: number]: { name: string; label: string; content: any } }
	logo: any
	selectHandler: Function
	selected: number
}

function SideBarLeft({ element, logo, selectHandler, selected }: SideBarLeftProps) {
	const router = useRouter()
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({showMessage: false}).then((res) => {
            console.log('여기에 할일')
        })
		// router.push("/teacher/login")
	}

	const renderElement = Object.keys(element).map((el: any, idx) => {
		return (
			<div
				key={`${element[el].name}-${idx}`}
				css={elementWrapperCSS({ target: el, selected })}
				onClick={() => {
					selectHandler(el)
				}}
			>
				<div css={elementContentCSS}>{element[el].content}</div>
			</div>
		)
	})

	return (
		<div css={sideBarLeftWrapperCSS}>
			<div css={topWrapperCSS}>
				<div css={logoWrapperCSS}>{logo}</div>
				{renderElement}
			</div>
			<div css={bottomWrapperCSS}>
				<div
					css={elementWrapperCSS({ target: -1, selected })}
					onClick={() => {
						signoutHandler()
					}}
				>
					<div css={elementContentCSS}>{MAIN_SIGNOUT}</div>
				</div>
				<div css={elementWrapperCSS({ target: -1, selected })}>
					<div css={elementContentCSS}>{MAIN_SETTING}</div>
				</div>
				<div css={bottomLineCSS} />
				<img css={userImgCSS} src={"/assets/account.png"} alt="" />
			</div>
		</div>
	)
}

const sideBarLeftWrapperCSS = css`
	width: 25%;
	height: 100%;
	background-color: #064f32;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	user-select: none;
	padding: 36px 0px 36px 0px;
`

const topWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const bottomWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const logoWrapperCSS = css`
	width: 40%;
	margin-bottom: 36px;
`

const elementWrapperCSS = ({ target, selected }: { target: number; selected: number }) => {
	return css`
		width: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding: 16px; */
		margin: 4px;
		transition-property: background-color opacity;
		transition-duration: 0.3s;
		border-radius: 10px;
		background-color: ${Number(target) === Number(selected) && "#38735A"};
		opacity: ${Number(target) === Number(selected) ? "100%" : "60%"};
		cursor: pointer;

		&:after {
			content: "";
			display: block;
			padding-bottom: 100%;
		}

		&:hover {
			background-color: ${Number(target) !== Number(selected) && "#38735A"};
		}
	`
}

const userImgCSS = css`
	width: 50%;
	cursor: pointer;
`

const bottomLineCSS = css`
	width: 70%;
	height: 1px;
	border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	margin: 8px 0px 28px 0px;
`

const elementContentCSS = css`
	width: 50%;
`

export default SideBarLeft
