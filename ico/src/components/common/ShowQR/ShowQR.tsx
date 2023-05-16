import React, { useMemo } from "react"
import QRCode from "react-qr-code"
import { css } from "@emotion/react"
import useMediaQuery from "@/hooks/useMediaQuery"
import Timer from "./Timer"

type ShowQRProps = {
	type: "ico_rental" | "ico_purchase"
	id: number
	time: number
}

function ShowQR({ type, id, time }: ShowQRProps) {
	const isMobile = useMediaQuery("(max-width: 768px")

	return (
		<div css={modalWrapperCSS({ isMobile })}>
			<QRCode value={`${type},${id},${time}`} />
			<Timer />
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
		justify-content: center;
		align-items: center;
	`
}

export default ShowQR
