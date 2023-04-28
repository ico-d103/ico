import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="en">
			<Head />

			<body>
				<link href="https://webfontworld.github.io/sunn/SUIT.css" rel="stylesheet"></link>
				{/* modal이 렌더링 될 위치 */}
				<div id="portal" />

				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
