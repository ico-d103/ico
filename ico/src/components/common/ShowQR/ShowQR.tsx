import React, { useMemo, useEffect, useState } from "react"
import QRCode from "react-qr-code"
import { css } from "@emotion/react"
import useMediaQuery from "@/hooks/useMediaQuery"
import Timer from "./Timer"
import useNotification from "@/hooks/useNotification"
import NotiTemplate from "../StackNotification/NotiTemplate"



type ShowQRProps = {
	seller: string
	time: number
	closeComp?: Function
}

function ShowQR({ seller, time, closeComp }: ShowQRProps) {
	const isMobile = useMediaQuery("(max-width: 768px")
	const noti = useNotification()

	const expiredHandler = () => {
		noti({ content: <NotiTemplate type={"alert"} content={"QR 코드를 다시 켜주세요!"} />, duration: 5000 })
		closeComp && closeComp()
	}



	return (
		<div css={modalWrapperCSS({ isMobile })}>
			<QRCode value={`${encodeURI(seller)},${time}`} />
			<Timer targetTime={Date.now() + 3 * 60 * 1000} funcHandler={expiredHandler} />
		</div>
	)
}

const modalWrapperCSS = ({ isMobile }: { isMobile: boolean | null }) => {
	return css`
		width: ${isMobile ? "90vw" : "360px"};
		height: ${isMobile ? "90vw" : "360px"};
		border-radius: 10px;
		box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
	`
}

export default ShowQR
