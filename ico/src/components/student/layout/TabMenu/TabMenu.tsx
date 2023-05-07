import { css } from "@emotion/react"
import Link from "next/link"

type TabMenuPropsType = {
	menus: { idx: number; url: string; title: string }[]
	selected: number
}

function TabMenu({ menus, selected }: TabMenuPropsType) {
	return (
		<div css={wrapperCSS(menus.length)}>
			{menus.map((menu) => (
				<Link key={menu.idx} href={menu.url} css={selected === menu.idx ? selectedCSS : null}>
					<div>{menu.title}</div>
				</Link>
			))}
		</div>
	)
}

const wrapperCSS = (length: number) => {
	return css`
		width: 100%;
		height: 52px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		> a {
			width: calc(100% / ${length});
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			> div {
				color: var(--student-font-color);
			}
		}
	`
}

const selectedCSS = css`
	background-color: #ffffff62;
	border-radius: 10px 10px 0px 0px;
	border-bottom: 3px solid #ff9f00;
	font-weight: bold;
`

export default TabMenu
