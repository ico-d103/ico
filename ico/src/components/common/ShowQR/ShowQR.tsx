import React, {useMemo} from "react"
import QRCode from "react-qr-code"
import { css } from "@emotion/react"
import useMediaQuery from "@/hooks/useMediaQuery"

type ShowQRProps = {
	id: number
    time: number
}

function ShowQR({ id, time }: ShowQRProps) {
	const isMobile = useMediaQuery("(max-width: 768px")

	return (
		<div css={modalWrapperCSS({ isMobile })}>
			<QRCode value={`ico_rental,${id},${time}`} />
		</div>
	)
}

const modalWrapperCSS = ({ isMobile }: { isMobile: boolean | null }) => {
	return css`
        width: ${isMobile ? '90vw' : '360px'};
        height: ${isMobile ? '90vw' : '360px'};
        border-radius: 10px;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    `
}

export default ShowQR
