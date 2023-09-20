import { useState } from "react"
import { css } from "@emotion/react"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import { ID_ICON } from "../Signup/SignupIcons/SignupIcons"
import { NUM_ONLY } from "@/util/regex"
import { postResetPwAPI } from "@/api/teacher/user/postResetPwAPI"

function AccountFindPwModalContent() {
	const [phoneNum, setPhoneNum] = useState<string>("")
	const [resultText, setResultText] = useState<null | string>(null)

	const changePhoneNumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		if (!NUM_ONLY.test(inputValue)) {
			inputValue = inputValue.replace(/\D/g, "")
			e.target.value = inputValue
			return
		}

		setPhoneNum(e.target.value)
	}

	const fetchFindIdAPI = () => {
		postResetPwAPI({ body: { phoneNum } })
			.then((res) => {
				setResultText(res)
			})
			.catch(() => {
				setResultText("")
			})
	}

	return (
		<div css={wrapperCSS} onClick={(e) => e.stopPropagation()}>
			<div css={inputWrapperCSS}>
				<Input
					customCss={inputCSS}
					leftContent={ID_ICON}
					theme={"default"}
					type="text"
					placeholder="가입하신 휴대폰 번호를 입력해주세요."
					onChange={changePhoneNumHandler}
				/>
				{resultText !== null &&
					(resultText !== "" ? (
						<div css={positiveCSS}>가입하신 번호로 새로운 비밀번호를 전송하였습니다.</div>
					) : (
						<div css={negativeCSS}>가입하신 계정이 없습니다.</div>
					))}
				<Button
					theme={"highlighted"}
					width={"100px"}
					height={"30px"}
					text={"제출"}
					fontSize={"var(--teacher-h5)"}
					onClick={fetchFindIdAPI}
				></Button>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const inputWrapperCSS = css`
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`

const inputCSS = css`
	width: 300px;
`

const positiveCSS = css`
	color: #42a44a;
`

const negativeCSS = css`
	color: #e24a3d;
`

export default AccountFindPwModalContent
