import Button from "@/components/common/Button/Button"
import { css } from "@emotion/react"
import { useRouter } from "next/router"

function page404() {
	const router = useRouter()

	return (
		<div css={wrapper}>
			{/* 임시 문구 */}
			<h1>404 NOT FOUND</h1>
			<h2>잘못된 접근입니다.</h2>
			<Button
				text={"홈으로 이동"}
				fontSize={"var(--teacher-h3)"}
				width={"30%"}
				theme={"normal"}
				onClick={() => {
					router.push("/")
				}}
			/>
		</div>
	)
}

const wrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
	height: 100vh;

	> h1 {
		font-weight: bold;
		font-size: 3.5rem;
	}

	> h2 {
		font-size: var(--teacher-h2);
	}
`

export default page404
